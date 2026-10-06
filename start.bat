@echo off
chcp 65001 >nul
title Anime Battle Cats Prototype
echo Starting Local Web Server...

where py >nul 2>nul
if %ERRORLEVEL% equ 0 (
    py server.py
    goto end
)

where python >nul 2>nul
if %ERRORLEVEL% equ 0 (
    python server.py
    goto end
)

if exist "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" (
    "%LOCALAPPDATA%\Programs\Python\Python313\python.exe" server.py
    goto end
)

echo [ERROR] Python was not found. Please make sure Python is installed.

:end
pause
