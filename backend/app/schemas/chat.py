from pydantic import BaseModel
from typing import Optional
from ..models.ticket import TicketCategory


class ChatRequest(BaseModel):
    session_id: str
    message: str
    category: Optional[TicketCategory] = None


class ChatResponse(BaseModel):
    response: str
    confidence_score: float
    suggest_ticket: bool
    relevant_kb_articles: list[int] = []
