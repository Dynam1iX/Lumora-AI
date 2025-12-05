from .chat import router as chat_router
from .tickets import router as tickets_router
from .knowledge import router as knowledge_router
from .admin import router as admin_router

__all__ = ["chat_router", "tickets_router", "knowledge_router", "admin_router"]
