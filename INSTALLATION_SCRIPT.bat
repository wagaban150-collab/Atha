@echo off
REM Atha - Automated Installation Script for Windows
REM Usage: INSTALLATION_SCRIPT.bat

setlocal enabledelayedexpansion

echo ========================================
echo   Atha - Installation Script (Windows)
echo ========================================
echo.

REM Check Node.js
echo Checking prerequisites...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js v18+
    exit /b 1
)
echo [OK] Node.js found

REM Check npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: npm is not installed.
    exit /b 1
)
echo [OK] npm found

REM Check Docker
docker --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Docker found
    set HAS_DOCKER=1
) else (
    echo [WARNING] Docker not found. Will use local setup.
    set HAS_DOCKER=0
)

echo.
echo Setting up environment files...

REM Create .env files
if not exist "backend\.env" (
    copy ".env.example" "backend\.env"
    echo [OK] Created backend\.env
) else (
    echo [WARNING] backend\.env already exists
)

if not exist "frontend\.env" (
    copy ".env.example" "frontend\.env"
    echo [OK] Created frontend\.env
) else (
    echo [WARNING] frontend\.env already exists
)

echo.

if !HAS_DOCKER! equ 1 (
    echo Starting with Docker...
    docker-compose up -d
    echo [OK] Docker containers started
    echo Waiting for services...
    timeout /t 10 /nobreak
) else (
    echo Starting local setup...
    echo.
    echo Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    echo [OK] Backend setup complete
)

echo.
echo Installing frontend dependencies...
cd frontend
call npm install
cd ..
echo [OK] Frontend setup complete

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Open a new Command Prompt or PowerShell
echo 2. Start backend (in one terminal):
echo    cd backend
echo    npm run dev
echo.
echo 3. Start frontend (in another terminal):
echo    cd frontend
echo    npm run dev
echo.
echo 4. Open browser:
echo    http://localhost:5173
echo.
echo 5. Create an account and start trading!
echo.
echo For more help, see: SETUP_GUIDE.md
echo.
pause
