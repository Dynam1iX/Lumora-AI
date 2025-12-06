from sqlalchemy import Column, Integer, String, Text, DateTime, Enum, Boolean, Float
from sqlalchemy.sql import func
from datetime import datetime
import enum
from ..core.database import Base


class TicketStatus(str, enum.Enum):
    NEW = "new"
    AI_PROCESSING = "ai_processing"
    AI_RESOLVED = "ai_resolved"
    NEEDS_HUMAN = "needs_human"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


class TicketPriority(str, enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class TicketCategory(str, enum.Enum):
    ACCESS_PASSWORDS = "access_passwords"
    NETWORK = "network"
    PRINTERS = "printers"
    SOFTWARE = "software"
    HARDWARE = "hardware"
    OTHER = "other"


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    user_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    category = Column(Enum(TicketCategory), nullable=False)
    problem = Column(Text, nullable=False)
    status = Column(Enum(TicketStatus), default=TicketStatus.NEW, nullable=False)
    priority = Column(Enum(TicketPriority), default=TicketPriority.MEDIUM, nullable=False)

    # AI fields
    ai_attempted = Column(Boolean, default=False, nullable=False)
    ai_solution = Column(Text, nullable=True)
    ai_confidence = Column(Float, nullable=True)

    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)

    # Human support
    admin_response = Column(Text, nullable=True)
