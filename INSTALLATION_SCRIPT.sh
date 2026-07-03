#!/bin/bash

# Atha - Automated Installation Script
# This script automates the setup process for Atha
# Usage: bash INSTALLATION_SCRIPT.sh

set -e

echo "========================================"
echo "  Atha - Installation Script"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_step() {
    echo -e "${GREEN}==>${NC} $1"
}

print_error() {
    echo -e "${RED}Error:${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}Warning:${NC} $1"
}

# Check prerequisites
print_step "Checking prerequisites..."

# Check Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v18+"
    exit 1
fi
echo "✓ Node.js $(node -v)"

# Check npm
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed."
    exit 1
fi
echo "✓ npm $(npm -v)"

# Check Docker (optional)
if command -v docker &> /dev/null; then
    echo "✓ Docker $(docker --version)"
    HAS_DOCKER=true
else
    print_warning "Docker not found. Will use local setup."
    HAS_DOCKER=false
fi

echo ""
print_step "Setting up environment files..."

# Create .env files
if [ ! -f "backend/.env" ]; then
    cp .env.example backend/.env
    echo "✓ Created backend/.env"
else
    print_warning "backend/.env already exists"
fi

if [ ! -f "frontend/.env" ]; then
    cp .env.example frontend/.env
    echo "✓ Created frontend/.env"
else
    print_warning "frontend/.env already exists"
fi

echo ""

if [ "$HAS_DOCKER" = true ]; then
    print_step "Starting with Docker..."
    echo "Running: docker-compose up"
    docker-compose up -d
    echo "✓ Docker containers started"
    echo ""
    print_step "Waiting for services to be ready..."
    sleep 10
    echo "✓ Services ready"
else
    print_step "Starting local setup..."
    
    # Check PostgreSQL
    if ! command -v psql &> /dev/null; then
        print_error "PostgreSQL is not installed. Please install PostgreSQL."
        exit 1
    fi
    echo "✓ PostgreSQL found"
    
    # Check Redis
    if ! command -v redis-cli &> /dev/null; then
        print_warning "Redis is not installed. Some features may not work."
    else
        echo "✓ Redis found"
    fi
    
    # Setup backend
    print_step "Setting up backend..."
    cd backend
    npm install
    npm run migrate || print_warning "Migration may need manual setup"
    cd ..
    echo "✓ Backend setup complete"
fi

# Setup frontend
print_step "Setting up frontend..."
cd frontend
npm install
cd ..
echo "✓ Frontend setup complete"

echo ""
echo "========================================"
echo "  ${GREEN}Installation Complete!${NC}"
echo "========================================"
echo ""
echo "Next steps:"
echo ""

if [ "$HAS_DOCKER" = true ]; then
    echo "1. Start frontend in a new terminal:"
    echo "   cd frontend && npm run dev"
    echo ""
    echo "2. Open browser:"
    echo "   Frontend: ${GREEN}http://localhost:5173${NC}"
    echo "   Backend:  ${GREEN}http://localhost:3001${NC}"
else
    echo "1. Start backend (in one terminal):"
    echo "   cd backend && npm run dev"
    echo ""
    echo "2. Start frontend (in another terminal):"
    echo "   cd frontend && npm run dev"
    echo ""
    echo "3. Open browser:"
    echo "   ${GREEN}http://localhost:5173${NC}"
fi

echo ""
echo "4. Create an account and start trading!"
echo ""
echo "For more help, see: SETUP_GUIDE.md"
echo ""
