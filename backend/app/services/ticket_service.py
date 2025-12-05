from sqlalchemy.orm import Session
from typing import List, Optional
from ..models.ticket import Ticket, TicketStatus, TicketCategory


class TicketService:
    @staticmethod
    def create(db: Session, ticket_data: dict) -> Ticket:
        """Create a new ticket."""
        ticket = Ticket(**ticket_data)
        db.add(ticket)
        db.commit()
        db.refresh(ticket)
        return ticket

    @staticmethod
    def get_by_id(db: Session, ticket_id: int) -> Optional[Ticket]:
        """Get ticket by ID."""
        return db.query(Ticket).filter(Ticket.id == ticket_id).first()

    @staticmethod
    def get_all(
        db: Session,
        status: Optional[TicketStatus] = None,
        category: Optional[TicketCategory] = None,
        skip: int = 0,
        limit: int = 100
    ) -> List[Ticket]:
        """Get all tickets with optional filters."""
        query = db.query(Ticket)

        if status:
            query = query.filter(Ticket.status == status)

        if category:
            query = query.filter(Ticket.category == category)

        return query.order_by(Ticket.created_at.desc()).offset(skip).limit(limit).all()

    @staticmethod
    def update(db: Session, ticket_id: int, update_data: dict) -> Optional[Ticket]:
        """Update ticket."""
        ticket = TicketService.get_by_id(db, ticket_id)
        if not ticket:
            return None

        for key, value in update_data.items():
            if value is not None:
                setattr(ticket, key, value)

        db.commit()
        db.refresh(ticket)
        return ticket

    @staticmethod
    def count_by_status(db: Session) -> dict:
        """Get count of tickets by status."""
        from sqlalchemy import func

        results = db.query(
            Ticket.status,
            func.count(Ticket.id).label('count')
        ).group_by(Ticket.status).all()

        return {status.value: count for status, count in results}
