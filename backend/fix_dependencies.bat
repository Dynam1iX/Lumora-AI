@echo off
echo ================================
echo   Fixing Dependencies...
echo ================================
echo.

REM Activate virtual environment
call venv\Scripts\activate

REM Upgrade pip first
echo Upgrading pip...
python -m pip install --upgrade pip
echo.

REM Reinstall all dependencies
echo Reinstalling all dependencies...
pip install -r requirements.txt --upgrade
echo.

echo ================================
echo   Dependencies Fixed!
echo ================================
echo.
echo Now run: start_backend.bat
echo.
pause
