#!/bin/bash

# SmartStudy+ Setup Script
# This script sets up both frontend and backend

echo "🎓 SmartStudy+ Setup Script"
echo "=============================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Please install Node.js v16 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js detected:${NC} $(node --version)"
echo -e "${GREEN}✓ npm detected:${NC} $(npm --version)"
echo ""

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${YELLOW}⚠ MongoDB doesn't seem to be running. Please start MongoDB before running the servers.${NC}"
else
    echo -e "${GREEN}✓ MongoDB is running${NC}"
fi
echo ""

# Setup Backend
echo -e "${BLUE}Setting up Backend...${NC}"
cd server

if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env file from template...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created. Please update it with your settings.${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed successfully${NC}"
else
    echo -e "${YELLOW}✗ Backend installation failed${NC}"
    exit 1
fi

cd ..

# Setup Frontend
echo ""
echo -e "${BLUE}Setting up Frontend...${NC}"
cd client

echo "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed successfully${NC}"
else
    echo -e "${YELLOW}✗ Frontend installation failed${NC}"
    exit 1
fi

cd ..

# Final instructions
echo ""
echo -e "${GREEN}=============================="
echo "✓ Setup Complete!"
echo "==============================${NC}"
echo ""
echo "To start the application:"
echo ""
echo -e "${BLUE}1. Start the backend:${NC}"
echo "   cd server"
echo "   npm run dev"
echo ""
echo -e "${BLUE}2. In a new terminal, start the frontend:${NC}"
echo "   cd client"
echo "   npm run dev"
echo ""
echo -e "${BLUE}3. Open your browser:${NC}"
echo "   http://localhost:3000"
echo ""
echo -e "${YELLOW}Note: Make sure MongoDB is running before starting the backend!${NC}"
echo ""
