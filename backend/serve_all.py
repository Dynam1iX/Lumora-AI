"""
Serve both API and frontend from one server
"""
from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from pathlib import Path

# Import your main app
from app.main import app

# Path to frontend build
frontend_build = Path(__file__).parent.parent / "frontend" / "build"

if frontend_build.exists():
    # Mount static files
    app.mount("/assets", StaticFiles(directory=str(frontend_build / "assets")), name="assets")

    # Serve index.html for all non-API routes
    @app.get("/{full_path:path}")
    async def serve_frontend(full_path: str):
        # If it's an API route, let FastAPI handle it
        if full_path.startswith("api/") or full_path in ["health", "docs", "openapi.json", "redoc"]:
            return None  # Will fall through to API routes

        # Check if file exists in build
        file_path = frontend_build / full_path
        if file_path.exists() and file_path.is_file():
            return FileResponse(file_path)

        # Otherwise serve index.html (for SPA routing)
        return FileResponse(frontend_build / "index.html")
else:
    print(f"WARNING: Frontend build not found at {frontend_build}")
    print("Run 'npm run build' in frontend directory first")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
