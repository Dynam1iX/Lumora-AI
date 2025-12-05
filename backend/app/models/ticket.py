from sqlalchemy import Column, Integer, String, Text, DateTime, Enum
from sqlalchemy.sql import func
from datetime import datetime
import enum
from ..core.database import Base


class TicketStatus(str, enum.Enum):
    NEW = "new"
    IN_PROGRESS = "in_progress"
    RESOLVED = "resolved"
    CLOSED = "closed"


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
    email = Column(String(255), nullable=False)
    category = Column(Enum(TicketCategory), nullable=False)
    problem = Column(Text, nullable=False)
    status = Column(Enum(TicketStatus), default=TicketStatus.NEW, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    admin_response = Column(Text, nullable=True)
