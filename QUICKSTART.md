# 🚀 SmartStudy+ Quick Start Guide

## What You Have

A complete full-stack web application with:
- **Backend**: Node.js + Express + MongoDB API
- **Frontend**: React + Vite + Tailwind CSS
- **Features**: Attendance tracking, timetable management, task manager, smart study planner

## Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community)
- **npm** (comes with Node.js)

## Step-by-Step Setup

### 1. Extract the Project
```bash
# Navigate to the project directory
cd smartstudy-plus
```

### 2. Quick Setup (Automated)
```bash
# Make the setup script executable (Unix/Mac)
chmod +x setup.sh

# Run the setup script
./setup.sh
```

### 3. Manual Setup (Alternative)

#### Backend Setup
```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and update:
# - MONGODB_URI (if using custom MongoDB setup)
# - JWT_SECRET (use a strong random string)

# Seed database with demo data (optional)
node seed.js

# Start the backend
npm run dev
```

Backend runs on: `http://localhost:5000`

#### Frontend Setup
```bash
# In a new terminal
cd client

# Install dependencies
npm install

# Start the frontend
npm run dev
```

Frontend runs on: `http://localhost:3000`

### 4. Access the Application

Open your browser and visit: **http://localhost:3000**

## Demo Credentials

If you ran the seed script:
- **Email**: demo@smartstudy.com
- **Password**: demo123

## Testing the Features

### 1. Dashboard
- View your overall attendance and pending tasks
- See today's class schedule
- Check upcoming assignments

### 2. Attendance Tracker
- View subject-wise attendance percentages
- See status badges (Safe/Warning/Critical)
- Calculate classes needed to reach target

### 3. Timetable
- View your weekly class schedule
- See next class countdown
- Find free time slots

### 4. Task Manager
- Create and organize tasks
- Use Kanban board (To-Do, In Progress, Done)
- Set priorities and deadlines

### 5. Study Planner (Coming Soon)
- Auto-generate daily study plans
- Optimize free time usage
- Track study progress

## API Testing

You can test the API directly:

```bash
# Health check
curl http://localhost:5000/api/health

# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "college": "Test College",
    "semester": 3
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "demo@smartstudy.com",
    "password": "demo123"
  }'
```

## Project Structure

```
smartstudy-plus/
├── server/              # Backend API
│   ├── controllers/     # Business logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth & validation
│   └── server.js       # Entry point
│
├── client/             # Frontend React app
│   ├── src/
│   │   ├── App.jsx    # Main component (demo included)
│   │   └── main.jsx   # Entry point
│   ├── index.html
│   └── vite.config.js
│
└── README.md           # Full documentation
```

## Common Issues & Solutions

### MongoDB Connection Error
```
Error: MongooseServerSelectionError
```
**Solution**: Make sure MongoDB is running
```bash
# Start MongoDB
mongod

# Or on Mac with Homebrew
brew services start mongodb-community
```

### Port Already in Use
```
Error: Port 5000 is already in use
```
**Solution**: Change the PORT in server/.env or kill the process
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### npm install fails
```
Error: npm ERR! code EACCES
```
**Solution**: Try with sudo or fix npm permissions
```bash
# Option 1: Use sudo (not recommended)
sudo npm install

# Option 2: Fix npm permissions (recommended)
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- **Frontend**: Changes reflect immediately
- **Backend**: Uses nodemon for auto-restart

### Debugging
- **Backend**: Check terminal logs
- **Frontend**: Open browser DevTools (F12)
- **Database**: Use MongoDB Compass for GUI

### Code Changes
- **Backend**: Edit files in `server/`
- **Frontend**: Edit files in `client/src/`
- **Styles**: Edit `client/src/index.css`

## Building for Production

### Backend
```bash
cd server
npm start
```

### Frontend
```bash
cd client
npm run build
# Output in client/dist/
```

## Next Steps

1. **Customize**: Update colors, fonts, and branding
2. **Add Features**: Implement notifications, analytics
3. **Deploy**: Host on Vercel (frontend) + Railway (backend)
4. **Test**: Add unit and integration tests
5. **Secure**: Enable HTTPS, add rate limiting

## Resources

- **React Docs**: https://react.dev/
- **Express Docs**: https://expressjs.com/
- **MongoDB Docs**: https://www.mongodb.com/docs/
- **Tailwind CSS**: https://tailwindcss.com/

## Support

For issues:
1. Check the README.md for detailed documentation
2. Review the API documentation in server/README.md
3. Check frontend guide in client/README.md

## What's Included

✅ Complete backend API with authentication
✅ Modern React frontend with demo
✅ Database models and schemas
✅ Smart algorithms (attendance, study planning)
✅ Responsive design with dark mode
✅ Demo data seed script
✅ Comprehensive documentation

## Ready to Code!

The application is production-ready with:
- Clean, maintainable code
- Best practices followed
- Scalable architecture
- Security features
- Professional UI/UX

Happy coding! 🎓✨
