from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from ..models.ticket import TicketStatus, TicketCategory


class TicketCreate(BaseModel):
    user_name: str
    email: EmailStr
    category: TicketCategory
    problem: str


class TicketUpdate(BaseModel):
    status: Optional[TicketStatus] = None
    admin_response: Optional[str] = None


class TicketResponse(BaseModel):
    id: int
    user_name: str
    email: str
    category: TicketCategory
    problem: str
    status: TicketStatus
    created_at: datetime
    updated_at: datetime
    admin_response: Optional[str] = None

    class Config:
        from_attributes = True
