@echo off
echo Starting production server on port 5173...
echo.
cd build
python -m http.server 5173
