from pydantic import BaseModel
from ..models.ticket import TicketCategory


class KnowledgeBaseCreate(BaseModel):
    category: TicketCategory
    title: str
    problem: str
    solution: str
    keywords: str


class KnowledgeBaseResponse(BaseModel):
    id: int
    category: TicketCategory
    title: str
    problem: str
    solution: str
    keywords: str

    class Config:
        from_attributes = True


class KnowledgeSearchResponse(BaseModel):
    results: list[KnowledgeBaseResponse]
    total: int
