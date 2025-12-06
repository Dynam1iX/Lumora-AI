from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from ..models.ticket import TicketStatus, TicketCategory, TicketPriority


class TicketCreate(BaseModel):
    user_name: str
    email: EmailStr
    category: TicketCategory
    problem: str


class TicketAutoRequest(BaseModel):
    """Request for automatic ticket processing"""
    user_name: str
    email: EmailStr
    problem: str


class TicketUpdate(BaseModel):
    status: Optional[TicketStatus] = None
    priority: Optional[TicketPriority] = None
    admin_response: Optional[str] = None


class TicketResponse(BaseModel):
    id: int
    user_name: str
    email: str
    category: TicketCategory
    problem: str
    status: TicketStatus
    priority: TicketPriority
    ai_attempted: bool
    ai_solution: Optional[str] = None
    ai_confidence: Optional[float] = None
    created_at: datetime
    updated_at: datetime
    admin_response: Optional[str] = None

    class Config:
        from_attributes = True
