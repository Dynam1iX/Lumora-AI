@echo off
echo ================================
echo   API Key Checker
echo ================================
echo.

REM Check if .env exists
if not exist ".env" (
    echo [ERROR] .env file not found!
    echo.
    pause
    exit /b 1
)

REM Check if API key is set
findstr /C:"ANTHROPIC_API_KEY=your_api_key_here" .env >nul
if %errorlevel% equ 0 (
    echo [ERROR] ANTHROPIC_API_KEY is not configured!
    echo.
    echo Current value: your_api_key_here
    echo.
    echo You need to:
    echo 1. Get your API key from: https://console.anthropic.com/settings/keys
    echo 2. Open backend\.env in a text editor
    echo 3. Replace: ANTHROPIC_API_KEY=your_api_key_here
    echo 4. With: ANTHROPIC_API_KEY=sk-ant-api03-YOUR_ACTUAL_KEY
    echo 5. Save the file
    echo 6. Restart backend
    echo.
    pause
    exit /b 1
)

REM Check if API key looks valid
findstr /C:"ANTHROPIC_API_KEY=sk-ant-api03-" .env >nul
if %errorlevel% neq 0 (
    echo [WARNING] API key format looks unusual
    echo.
    echo Expected format: sk-ant-api03-...
    echo.
    echo Please verify your API key is correct
    echo Get it from: https://console.anthropic.com/settings/keys
    echo.
    pause
    exit /b 1
)

echo [OK] ANTHROPIC_API_KEY is configured!
echo.
echo API key found in .env file
echo Format looks correct (starts with sk-ant-api03-)
echo.
echo Next step: Run start_backend.bat
echo.
pause
