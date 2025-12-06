@echo off
echo ================================
echo   Lumora AI - Setup Checker
echo ================================
echo.

REM Check Python
echo [1/5] Checking Python...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python not found!
    echo Please install Python 3.11+ from https://www.python.org/downloads/
    pause
    exit /b 1
)
python --version
echo.

REM Check Node.js
echo [2/5] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found!
    echo Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)
node --version
echo.

REM Check npm
echo [3/5] Checking npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm not found!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
npm --version
echo.

REM Check backend .env
echo [4/5] Checking backend configuration...
if not exist "backend\.env" (
    echo [ERROR] backend\.env not found!
    pause
    exit /b 1
)

findstr /C:"your_api_key_here" backend\.env >nul
if %errorlevel% equ 0 (
    echo [WARNING] ANTHROPIC_API_KEY not set!
    echo.
    echo Please edit backend\.env and add your Anthropic API key
    echo Get your key from: https://console.anthropic.com/settings/keys
    echo.
) else (
    echo [OK] ANTHROPIC_API_KEY configured
)
echo.

REM Check frontend .env
echo [5/5] Checking frontend configuration...
if not exist "frontend\.env" (
    echo [ERROR] frontend\.env not found!
    pause
    exit /b 1
)
echo [OK] frontend\.env found
echo.

echo ================================
echo   Setup Check Complete!
echo ================================
echo.
echo Next steps:
echo 1. Make sure ANTHROPIC_API_KEY is set in backend\.env
echo 2. Run: start_backend.bat (in backend folder)
echo 3. Run: start_frontend.bat (in frontend folder)
echo 4. Open: http://localhost:5173
echo.
echo Or follow the detailed guide in START_NOW.md
echo.
pause
