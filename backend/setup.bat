@echo off
echo ========================================
echo Lumora AI Backend Setup
echo ========================================
echo.

echo [1/5] Creating virtual environment...
python -m venv venv
if errorlevel 1 (
    echo ERROR: Failed to create virtual environment
    pause
    exit /b 1
)

echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat

echo [3/5] Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo [4/5] Checking .env file...
if not exist .env (
    echo WARNING: .env file not found!
    echo Please copy .env.example to .env and configure it
    echo.
    copy .env.example .env
    echo Created .env from template. Please edit it with your API keys.
    echo.
)

echo [5/5] Seeding knowledge base...
python seed_knowledge.py
if errorlevel 1 (
    echo ERROR: Failed to seed knowledge base
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env file and add your ANTHROPIC_API_KEY
echo 2. Run: python main.py
echo 3. Open: http://localhost:8000/docs
echo.
pause
