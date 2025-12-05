from sqlalchemy import Column, Integer, String, Text
from ..core.database import Base
from .ticket import TicketCategory
from sqlalchemy import Enum


class KnowledgeBase(Base):
    __tablename__ = "knowledge_base"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(Enum(TicketCategory), nullable=False, index=True)
    title = Column(String(500), nullable=False)
    problem = Column(Text, nullable=False)
    solution = Column(Text, nullable=False)
    keywords = Column(Text, nullable=False)  # Comma-separated keywords
