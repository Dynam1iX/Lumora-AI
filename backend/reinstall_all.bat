@echo off
echo ================================
echo   Complete Reinstall
echo ================================
echo.
echo This will:
echo - Delete virtual environment
echo - Recreate it from scratch
echo - Install all dependencies
echo.
pause

REM Delete old venv
if exist "venv\" (
    echo [1/4] Removing old virtual environment...
    rmdir /s /q venv
    echo.
)

REM Create new venv
echo [2/4] Creating new virtual environment...
python -m venv venv
echo.

REM Activate venv
echo [3/4] Activating virtual environment...
call venv\Scripts\activate
echo.

REM Upgrade pip
echo [4/4] Upgrading pip and installing dependencies...
python -m pip install --upgrade pip
pip install -r requirements.txt
echo.

echo ================================
echo   Installation Complete!
echo ================================
echo.
echo Virtual environment recreated successfully.
echo All dependencies installed.
echo.
echo Next steps:
echo 1. Make sure you have ANTHROPIC_API_KEY in .env
echo 2. Run: start_backend.bat
echo.
pause
