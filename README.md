# 🎓 SmartStudy+ | Your Smart Academic Assistant

<div align="center">

![SmartStudy+ Banner](https://via.placeholder.com/800x200/667eea/ffffff?text=SmartStudy%2B)

**A modern, full-stack web application for college students to intelligently manage classes, attendance, tasks, and study planning.**

[![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)

</div>

---

## 🌟 Overview

SmartStudy+ is a comprehensive academic management system that helps students:
- 📚 Never miss a class with smart scheduling
- 📊 Maintain minimum attendance requirements
- ✅ Manage assignments & exams efficiently
- 🎯 Use free time optimally for studying
- 🔔 Receive intelligent reminders

## ✨ Key Features

### 🎯 Smart Attendance Tracking
- Real-time attendance percentage calculation
- Visual status indicators (Safe/Warning/Critical)
- Automatic calculation of classes needed to reach target
- Subject-wise detailed analytics

### 📅 Intelligent Timetable Management
- Weekly schedule overview
- Color-coded subjects
- Next class countdown
- Free slot detection
- Conflict prevention

### 📝 Advanced Task Manager
- Kanban board interface (To-Do/In Progress/Done)
- Priority-based task organization
- Deadline tracking with urgency detection
- Subject categorization
- Assignment type classification

### 🧠 Smart Study Planner
**Auto-generates daily study plans based on:**
- Free time between classes
- Upcoming exam dates
- Assignment deadlines
- Low attendance subjects
- Priority calculations

### 🔔 Intelligent Notifications
- Class reminder alerts
- Assignment deadline warnings
- Attendance status alerts
- Custom reminder timing

## 🎨 Design Highlights

- **Modern UI**: Glassmorphism design with gradient accents
- **Dark/Light Mode**: Full theme support
- **Responsive**: Mobile-first design
- **Animations**: Smooth micro-interactions
- **Typography**: Custom font pairing (DM Sans + Sora)
- **Color System**: Blue-purple gradient theme

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS** - Styling Framework
- **Framer Motion** - Animation Library
- **React Router** - Navigation
- **Axios** - HTTP Client
- **Recharts** - Data Visualization
- **Lucide React** - Icon Library

### Backend
- **Node.js** - Runtime Environment
- **Express** - Web Framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password Hashing

## 📁 Project Structure

```
smartstudy-plus/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React Context
│   │   ├── services/      # API services
│   │   ├── utils/         # Helper functions
│   │   ├── App.jsx        # Main app (demo included)
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── config/           # Configuration files
│   │   └── db.js         # Database connection
│   ├── controllers/      # Route controllers
│   │   ├── authController.js
│   │   ├── subjectController.js
│   │   ├── timetableController.js
│   │   ├── taskController.js
│   │   └── studyPlanController.js
│   ├── models/           # MongoDB models
│   │   ├── User.js
│   │   ├── Subject.js
│   │   ├── Timetable.js
│   │   ├── Task.js
│   │   ├── StudyPlan.js
│   │   └── Notification.js
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   │   └── auth.js       # JWT authentication
│   ├── utils/            # Utility functions
│   ├── server.js         # Entry point
│   └── package.json
│
└── README.md             # This file
```

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/smartstudy-plus.git
cd smartstudy-plus
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your settings
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/smartstudy
# JWT_SECRET=your_secret_key_here

# Start the server
npm run dev
```

Server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start development server
npm run dev
```

Client will run on `http://localhost:3000`

### 4. Access the Application

Open your browser and visit `http://localhost:3000`

## 📊 Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  college: String,
  semester: Number,
  attendanceCriteria: Number (default: 75),
  theme: String (light/dark)
}
```

### Subject Model
```javascript
{
  userId: ObjectId (ref: User),
  subjectName: String,
  subjectCode: String,
  totalClasses: Number,
  attendedClasses: Number,
  color: String,
  professor: String,
  // Virtuals:
  attendancePercentage: Number,
  attendanceStatus: String
}
```

### Timetable Model
```javascript
{
  userId: ObjectId,
  subjectId: ObjectId (ref: Subject),
  day: String,
  startTime: String (HH:MM),
  endTime: String (HH:MM),
  room: String,
  type: String (lecture/lab/tutorial/seminar)
}
```

### Task Model
```javascript
{
  userId: ObjectId,
  subjectId: ObjectId,
  title: String,
  description: String,
  deadline: Date,
  priority: String (low/medium/high),
  status: String (todo/in-progress/done),
  taskType: String (assignment/exam/project/quiz),
  // Virtuals:
  daysUntilDeadline: Number,
  urgencyLevel: String
}
```

### StudyPlan Model
```javascript
{
  userId: ObjectId,
  date: Date,
  studyBlocks: [{
    subjectId: ObjectId,
    startTime: String,
    endTime: String,
    duration: Number,
    topic: String,
    isCompleted: Boolean,
    priority: String
  }],
  totalStudyTime: Number,
  completedStudyTime: Number,
  // Virtual:
  progressPercentage: Number
}
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user
PUT    /api/auth/profile       - Update profile
```

### Subjects
```
GET    /api/subjects                      - Get all subjects
POST   /api/subjects                      - Create subject
GET    /api/subjects/:id                  - Get single subject
PUT    /api/subjects/:id                  - Update subject
DELETE /api/subjects/:id                  - Delete subject
POST   /api/subjects/:id/attendance       - Update attendance
GET    /api/subjects/analytics/attendance - Get analytics
```

### Timetable
```
GET    /api/timetable              - Get weekly timetable
POST   /api/timetable              - Create entry
GET    /api/timetable/today        - Get today's classes
GET    /api/timetable/next         - Get next class
GET    /api/timetable/freeslots/:day - Get free slots
PUT    /api/timetable/:id          - Update entry
DELETE /api/timetable/:id          - Delete entry
```

### Tasks
```
GET    /api/tasks              - Get all tasks
POST   /api/tasks              - Create task
GET    /api/tasks/kanban       - Get Kanban view
GET    /api/tasks/upcoming     - Get upcoming tasks
GET    /api/tasks/analytics    - Get analytics
PUT    /api/tasks/:id          - Update task
DELETE /api/tasks/:id          - Delete task
```

### Study Plan
```
POST   /api/studyplan/generate           - Generate smart plan
GET    /api/studyplan/:date              - Get plan for date
PUT    /api/studyplan/:id/block/:index   - Update study block
```

## 🧠 Smart Study Planner Algorithm

The study planner uses intelligent scheduling:

1. **Analyze Free Time**
   - Detect gaps between classes (minimum 30 minutes)
   - Calculate available study hours

2. **Prioritize Subjects**
   - Low attendance subjects (highest priority)
   - Upcoming exams/assignments
   - Task deadlines

3. **Allocate Time**
   - High priority: 90 minutes
   - Medium priority: 60 minutes
   - Low priority: 45 minutes

4. **Generate Blocks**
   - Match subjects to free slots
   - Include topic suggestions
   - Track completion status

## 🎯 Features Showcase

### Dashboard
- Personalized greeting with time-based salutations
- Quick stats overview (attendance, tasks, next class)
- Today's schedule with color-coded subjects
- Attendance status with circular progress
- Upcoming task previews

### Attendance Tracker
- Subject-wise attendance cards
- Visual percentage indicators
- Status badges (✅ Safe / ⚠️ Warning / ❌ Critical)
- Automatic calculation of classes needed
- Attendance trends and analytics

### Timetable Manager
- Weekly grid view
- Color-coded subjects
- Today's classes highlight
- Next class countdown
- Free slot calculator
- Add/Edit/Delete functionality

### Task Manager
- Kanban board (To-Do / In Progress / Done)
- Priority labels (High/Medium/Low)
- Deadline countdown timers
- Task filtering and search
- Quick task creation
- Drag-and-drop support

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Input validation
- XSS protection
- CORS configuration
- Environment variable management

## 🎨 UI Components

### Custom Components
- **StatCard** - Dashboard statistics with icons
- **CircularProgress** - Attendance visualization
- **GlassCard** - Glassmorphism container
- **Button** - Primary/Secondary variants
- **Input** - Styled form inputs
- **Modal** - Popup dialogs
- **Toast** - Notification system

## 📱 Responsive Design

The app is fully responsive with breakpoints:
- Mobile: 640px
- Tablet: 768px
- Desktop: 1024px
- Large: 1280px

## 🌐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartstudy
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=SmartStudy+
```

## 🚀 Deployment

### Backend (Heroku/Railway)
```bash
# Build
npm run build

# Set environment variables
# Deploy to hosting platform
```

### Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy dist folder
```

### Database (MongoDB Atlas)
1. Create cluster on MongoDB Atlas
2. Update MONGODB_URI in .env
3. Whitelist IP addresses

## 🧪 Testing

### Backend
```bash
# Run tests
npm test

# Test coverage
npm run test:coverage
```

### Frontend
```bash
# Run tests
npm test

# E2E tests
npm run test:e2e
```

## 📈 Future Enhancements

- [ ] Google Calendar sync
- [ ] Push notifications
- [ ] Voice alerts
- [ ] Gamification (badges, streaks)
- [ ] Study groups/collaboration
- [ ] AI-powered recommendations
- [ ] Mobile app (React Native)
- [ ] Offline mode (PWA)
- [ ] Admin panel for colleges
- [ ] Analytics dashboard
- [ ] Export data (PDF reports)
- [ ] Integration with LMS

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Project Lead** - Full-stack development
- **UI/UX Design** - Interface design
- **Backend** - API development
- **Frontend** - React development

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Inspiration from modern academic management systems

---

<div align="center">

**Built with ❤️ for students, by students**

[Demo](https://smartstudy-plus.vercel.app) • [Documentation](https://docs.smartstudy.com) • [Report Bug](https://github.com/yourusername/smartstudy-plus/issues)

</div>
