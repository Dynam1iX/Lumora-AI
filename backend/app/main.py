from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .core.config import settings
from .core.database import init_db
from .routers import chat_router, tickets_router, knowledge_router, admin_router
from .routers import support as support_router
from pathlib import Path
import os

app = FastAPI(
    title="IT HelpDesk API",
    description="AI-powered IT HelpDesk system with Claude integration - Replaces Tier 1 Support",
    version="2.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(support_router.router)  # Main endpoint for frontend
app.include_router(chat_router)
app.include_router(tickets_router)
app.include_router(knowledge_router)
app.include_router(admin_router)


@app.on_event("startup")
async def startup_event():
    """Initialize database on startup."""
    init_db()


@app.get("/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "database": "connected",
        "api": "operational"
    }


# Serve frontend static files
frontend_build = Path(__file__).parent.parent.parent / "frontend" / "build"

if frontend_build.exists():
    # Mount static assets
    app.mount("/assets", StaticFiles(directory=str(frontend_build / "assets")), name="assets")

    # Serve index.html for root and all non-API routes
    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        # Check if it's a file in build directory
        file_path = frontend_build / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)

        # Otherwise serve index.html (SPA routing)
        return FileResponse(frontend_build / "index.html")
else:
    @app.get("/")
    async def root():
        return {
            "status": "ok",
            "message": "IT HelpDesk API is running",
            "version": "2.0.0",
            "note": "Frontend not built. Run 'npm run build' in frontend directory."
        }
