@echo off
echo ================================
echo   Lumora AI - Frontend Startup
echo ================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [1/2] Installing dependencies...
    echo This may take 1-2 minutes...
    echo.
    npm install
    echo.
) else (
    echo [1/2] Dependencies found
    echo.
)

REM Start dev server
echo [2/2] Starting frontend server...
echo.
echo ================================
echo   Starting Frontend Server...
echo ================================
echo.
echo Frontend will be available at: http://localhost:5173
echo.
echo Press Ctrl+C to stop
echo.

npm run dev
