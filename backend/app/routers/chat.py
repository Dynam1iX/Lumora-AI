from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..schemas.chat import ChatRequest, ChatResponse
from ..services.ai_service import AIService
from ..services.knowledge_service import KnowledgeService
from ..models.chat_history import ChatHistory

router = APIRouter(prefix="/api/chat", tags=["chat"])
ai_service = AIService()


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    """
    Process chat message and return AI response.
    """
    try:
        # Save user message to history
        user_message = ChatHistory(
            session_id=request.session_id,
            message=request.message,
            is_bot=False
        )
        db.add(user_message)
        db.commit()

        # Get chat history for this session
        history_records = db.query(ChatHistory).filter(
            ChatHistory.session_id == request.session_id
        ).order_by(ChatHistory.created_at.desc()).limit(10).all()

        # Convert to format for AI (reverse to get chronological order)
        chat_history = []
        for record in reversed(history_records[:-1]):  # Exclude the message we just added
            role = "assistant" if record.is_bot else "user"
            chat_history.append({"role": role, "content": record.message})

        # Search knowledge base
        kb_articles = KnowledgeService.search(
            db,
            query=request.message,
            category=request.category,
            limit=3
        )

        # Format knowledge context for AI
        kb_context = KnowledgeService.format_context_for_ai(kb_articles)

        # Get AI response
        response_text, confidence = ai_service.get_response(
            message=request.message,
            chat_history=chat_history,
            knowledge_context=kb_context
        )

        # Save bot response to history
        bot_message = ChatHistory(
            session_id=request.session_id,
            message=response_text,
            is_bot=True,
            confidence_score=confidence
        )
        db.add(bot_message)
        db.commit()

        # Determine if we should suggest creating a ticket
        suggest_ticket = ai_service.should_suggest_ticket(confidence)

        return ChatResponse(
            response=response_text,
            confidence_score=confidence,
            suggest_ticket=suggest_ticket,
            relevant_kb_articles=[article.id for article in kb_articles]
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")
