from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from ..core.database import get_db
from ..schemas.knowledge import KnowledgeSearchResponse, KnowledgeBaseResponse
from ..services.knowledge_service import KnowledgeService
from ..models.ticket import TicketCategory

router = APIRouter(prefix="/api/knowledge", tags=["knowledge"])


@router.get("/search", response_model=KnowledgeSearchResponse)
async def search_knowledge(
    q: str = Query(..., min_length=1, description="Search query"),
    category: Optional[TicketCategory] = Query(None, description="Filter by category"),
    limit: int = Query(10, ge=1, le=50, description="Maximum results"),
    db: Session = Depends(get_db)
):
    """
    Search knowledge base by query and optional category.
    """
    articles = KnowledgeService.search(db, query=q, category=category, limit=limit)

    return KnowledgeSearchResponse(
        results=[KnowledgeBaseResponse.model_validate(article) for article in articles],
        total=len(articles)
    )


@router.get("/{article_id}", response_model=KnowledgeBaseResponse)
async def get_knowledge_article(article_id: int, db: Session = Depends(get_db)):
    """
    Get knowledge base article by ID.
    """
    from fastapi import HTTPException
    from ..models.knowledge_base import KnowledgeBase

    article = db.query(KnowledgeBase).filter(KnowledgeBase.id == article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    return article
