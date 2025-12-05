from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from ..core.database import get_db
from ..schemas.ticket import TicketResponse, TicketUpdate
from ..schemas.knowledge import KnowledgeBaseCreate, KnowledgeBaseResponse
from ..services.ticket_service import TicketService
from ..services.knowledge_service import KnowledgeService
from ..models.ticket import TicketStatus, TicketCategory

router = APIRouter(prefix="/api/admin", tags=["admin"])


# Simple auth dependency (for MVP)
async def verify_admin(
    username: str = Query(...),
    password: str = Query(...)
):
    from ..core.config import settings
    if username != settings.ADMIN_USERNAME or password != settings.ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return True


@router.get("/tickets", response_model=List[TicketResponse])
async def get_tickets(
    status: Optional[TicketStatus] = Query(None),
    category: Optional[TicketCategory] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin)
):
    """
    Get all tickets with optional filters (Admin only).
    """
    tickets = TicketService.get_all(db, status=status, category=category, skip=skip, limit=limit)
    return tickets


@router.patch("/tickets/{ticket_id}", response_model=TicketResponse)
async def update_ticket(
    ticket_id: int,
    ticket_update: TicketUpdate,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin)
):
    """
    Update ticket status and/or add admin response (Admin only).
    """
    update_data = ticket_update.model_dump(exclude_unset=True)
    ticket = TicketService.update(db, ticket_id, update_data)

    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    return ticket


@router.post("/knowledge", response_model=KnowledgeBaseResponse, status_code=201)
async def create_knowledge_article(
    article: KnowledgeBaseCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin)
):
    """
    Create new knowledge base article (Admin only).
    """
    try:
        article_data = article.model_dump()
        new_article = KnowledgeService.create(db, article_data)
        return new_article
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating article: {str(e)}")


@router.get("/knowledge", response_model=List[KnowledgeBaseResponse])
async def get_all_knowledge(
    category: Optional[TicketCategory] = Query(None),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin)
):
    """
    Get all knowledge base articles (Admin only).
    """
    articles = KnowledgeService.get_all(db, category=category, skip=skip, limit=limit)
    return articles


@router.get("/stats")
async def get_stats(
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin)
):
    """
    Get statistics (Admin only).
    """
    return {
        "tickets_by_status": TicketService.count_by_status(db)
    }
