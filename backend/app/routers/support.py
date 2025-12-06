from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..schemas.ticket import TicketAutoRequest, TicketResponse
from ..services.ai_service import AIService
from ..services.knowledge_service import KnowledgeService
from ..services.ticket_service import TicketService
from ..models.ticket import TicketStatus

router = APIRouter(prefix="/api/support", tags=["support"])
ai_service = AIService()


@router.post("", response_model=TicketResponse, status_code=201)
async def create_support_request(request: TicketAutoRequest, db: Session = Depends(get_db)):
    """
    ГЛАВНЫЙ ENDPOINT ДЛЯ ФРОНТЕНДА

    Полностью автоматическая обработка обращения пользователя:
    1. Автоматически создается тикет
    2. AI определяет категорию и приоритет
    3. AI пытается решить проблему
    4. Если AI не может решить (confidence < 0.6) - эскалирует к человеку
    5. Если AI решил - помечает тикет как AI_RESOLVED

    Это ЗАМЕНЯЕТ первую линию поддержки.
    """
    try:
        # Шаг 1: Поиск решений в базе знаний
        kb_articles = KnowledgeService.search(
            db,
            query=request.problem,
            limit=3
        )
        kb_context = KnowledgeService.format_context_for_ai(kb_articles)

        # Шаг 2: AI обрабатывает проблему (определяет категорию, приоритет, пытается решить)
        ai_result = ai_service.process_ticket_auto(
            problem=request.problem,
            knowledge_context=kb_context
        )

        # Шаг 3: Определяем статус тикета
        if ai_result['needs_human']:
            # AI не уверен или проблема сложная - нужен человек
            status = TicketStatus.NEEDS_HUMAN
        else:
            # AI смог решить
            status = TicketStatus.AI_RESOLVED

        # Шаг 4: Создаем тикет с результатами AI обработки
        ticket_data = {
            'user_name': request.user_name,
            'email': request.email,
            'problem': request.problem,
            'category': ai_result['category'],
            'priority': ai_result['priority'],
            'status': status,
            'ai_attempted': True,
            'ai_solution': ai_result['solution'],
            'ai_confidence': ai_result['confidence']
        }

        new_ticket = TicketService.create(db, ticket_data)

        return new_ticket

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing support request: {str(e)}")


@router.get("/my-tickets", response_model=list[TicketResponse])
async def get_my_tickets(email: str, db: Session = Depends(get_db)):
    """
    Получить все тикеты пользователя по email.
    """
    tickets = TicketService.get_by_email(db, email)
    return tickets
