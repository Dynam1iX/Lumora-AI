from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime
from sqlalchemy.sql import func
from ..core.database import Base


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(255), nullable=False, index=True)
    message = Column(Text, nullable=False)
    is_bot = Column(Boolean, nullable=False)
    confidence_score = Column(Float, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
