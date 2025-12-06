@echo off
echo ================================
echo   Lumora AI - Backend Startup
echo ================================
echo.

REM Check if virtual environment exists
if not exist "venv\" (
    echo [1/4] Creating virtual environment...
    python -m venv venv
    echo.
) else (
    echo [1/4] Virtual environment found
    echo.
)

REM Activate virtual environment
echo [2/4] Activating virtual environment...
call venv\Scripts\activate
echo.

REM Install dependencies
echo [3/4] Installing dependencies...
pip install -r requirements.txt --quiet
echo.

REM Check if database is seeded
if not exist "helpdesk.db" (
    echo [4/4] Seeding knowledge base...
    python seed_knowledge.py
    echo.
) else (
    echo [4/4] Database found
    echo.
)

REM Start server
echo ================================
echo   Starting Backend Server...
echo ================================
echo.
echo Backend will be available at: http://localhost:8000
echo Health check: http://localhost:8000/health
echo API Docs: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop
echo.

python main.py
