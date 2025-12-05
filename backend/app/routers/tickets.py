from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..core.database import get_db
from ..schemas.ticket import TicketCreate, TicketResponse
from ..services.ticket_service import TicketService

router = APIRouter(prefix="/api/tickets", tags=["tickets"])


@router.post("", response_model=TicketResponse, status_code=201)
async def create_ticket(ticket: TicketCreate, db: Session = Depends(get_db)):
    """
    Create a new support ticket.
    """
    try:
        ticket_data = ticket.model_dump()
        new_ticket = TicketService.create(db, ticket_data)
        return new_ticket
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating ticket: {str(e)}")


@router.get("/{ticket_id}", response_model=TicketResponse)
async def get_ticket(ticket_id: int, db: Session = Depends(get_db)):
    """
    Get ticket by ID.
    """
    ticket = TicketService.get_by_id(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket
