from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.knowledge_base import KnowledgeBase
from ..models.ticket import TicketCategory


class KnowledgeService:
    @staticmethod
    def search(
        db: Session,
        query: str,
        category: Optional[TicketCategory] = None,
        limit: int = 5
    ) -> List[KnowledgeBase]:
        """
        Search knowledge base by keywords and category.

        Args:
            db: Database session
            query: Search query
            category: Optional category filter
            limit: Maximum number of results

        Returns:
            List of matching knowledge base articles
        """
        # Split query into keywords
        keywords = [kw.lower().strip() for kw in query.split() if len(kw.strip()) > 2]

        if not keywords:
            return []

        # Build query
        db_query = db.query(KnowledgeBase)

        # Filter by category if provided
        if category:
            db_query = db_query.filter(KnowledgeBase.category == category)

        # Get all articles
        articles = db_query.all()

        # Rank articles by keyword matches
        ranked_articles = []
        for article in articles:
            score = KnowledgeService._calculate_relevance_score(article, keywords)
            if score > 0:
                ranked_articles.append((article, score))

        # Sort by score (descending) and return top results
        ranked_articles.sort(key=lambda x: x[1], reverse=True)
        return [article for article, _ in ranked_articles[:limit]]

    @staticmethod
    def _calculate_relevance_score(article: KnowledgeBase, keywords: List[str]) -> int:
        """Calculate relevance score based on keyword matches."""
        score = 0

        # Combine searchable text
        searchable_text = f"{article.title} {article.problem} {article.keywords}".lower()

        for keyword in keywords:
            # Count occurrences of each keyword
            score += searchable_text.count(keyword) * 2  # Weight keywords more

            # Bonus for exact title match
            if keyword in article.title.lower():
                score += 5

        return score

    @staticmethod
    def format_context_for_ai(articles: List[KnowledgeBase]) -> str:
        """Format knowledge base articles as context for AI."""
        if not articles:
            return ""

        context_parts = []
        for i, article in enumerate(articles, 1):
            context_parts.append(f"""
Статья {i}: {article.title}
Категория: {article.category.value}
Проблема: {article.problem}
Решение: {article.solution}
""")

        return "\n---\n".join(context_parts)

    @staticmethod
    def create(db: Session, article_data: dict) -> KnowledgeBase:
        """Create new knowledge base article."""
        article = KnowledgeBase(**article_data)
        db.add(article)
        db.commit()
        db.refresh(article)
        return article

    @staticmethod
    def get_all(
        db: Session,
        category: Optional[TicketCategory] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[KnowledgeBase]:
        """Get all knowledge base articles."""
        query = db.query(KnowledgeBase)

        if category:
            query = query.filter(KnowledgeBase.category == category)

        return query.offset(skip).limit(limit).all()
