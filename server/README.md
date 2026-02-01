# SmartStudy+ Backend API

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smartstudy
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

5. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Vidur Kumar",
  "email": "vidur@example.com",
  "password": "password123",
  "college": "ABC University",
  "semester": 3,
  "attendanceCriteria": 75
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "vidur@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Vidur Kumar",
  "semester": 4,
  "theme": "dark"
}
```

### Subjects

#### Get All Subjects
```http
GET /subjects
Authorization: Bearer <token>
```

#### Create Subject
```http
POST /subjects
Authorization: Bearer <token>
Content-Type: application/json

{
  "subjectName": "Data Structures",
  "subjectCode": "CS201",
  "color": "#3B82F6",
  "professor": "Dr. Smith"
}
```

#### Update Attendance
```http
POST /subjects/:id/attendance
Authorization: Bearer <token>
Content-Type: application/json

{
  "attended": true
}
```

#### Get Attendance Analytics
```http
GET /subjects/analytics/attendance
Authorization: Bearer <token>
```

### Timetable

#### Get Weekly Timetable
```http
GET /timetable
Authorization: Bearer <token>
```

#### Get Today's Classes
```http
GET /timetable/today
Authorization: Bearer <token>
```

#### Get Next Class
```http
GET /timetable/next
Authorization: Bearer <token>
```

#### Create Timetable Entry
```http
POST /timetable
Authorization: Bearer <token>
Content-Type: application/json

{
  "subjectId": "60d5ec49f1b2c72b8c8e4a1b",
  "day": "Monday",
  "startTime": "09:00",
  "endTime": "10:00",
  "room": "Room 101",
  "type": "lecture"
}
```

#### Get Free Slots
```http
GET /timetable/freeslots/:day
Authorization: Bearer <token>
```

### Tasks

#### Get All Tasks
```http
GET /tasks?status=todo&priority=high
Authorization: Bearer <token>
```

#### Get Kanban View
```http
GET /tasks/kanban
Authorization: Bearer <token>
```

#### Get Upcoming Tasks
```http
GET /tasks/upcoming
Authorization: Bearer <token>
```

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete Lab Assignment",
  "description": "Implement binary search tree",
  "deadline": "2026-02-10T23:59:59.000Z",
  "priority": "high",
  "subjectId": "60d5ec49f1b2c72b8c8e4a1b",
  "taskType": "assignment"
}
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "done"
}
```

#### Get Task Analytics
```http
GET /tasks/analytics
Authorization: Bearer <token>
```

### Study Plan

#### Generate Smart Study Plan
```http
POST /studyplan/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "date": "2026-02-05"
}
```

#### Get Study Plan
```http
GET /studyplan/:date
Authorization: Bearer <token>
```

#### Update Study Block
```http
PUT /studyplan/:id/block/:blockIndex
Authorization: Bearer <token>
Content-Type: application/json

{
  "isCompleted": true
}
```

## 🗄️ Database Schema

### User
- name, email, password
- college, semester
- attendanceCriteria (default: 75%)
- theme (light/dark)

### Subject
- userId (ref: User)
- subjectName, subjectCode
- totalClasses, attendedClasses
- color, professor
- Virtual: attendancePercentage, attendanceStatus

### Timetable
- userId, subjectId (refs)
- day, startTime, endTime
- room, type (lecture/lab/tutorial/seminar)
- isActive

### Task
- userId, subjectId (refs)
- title, description
- deadline, priority, status
- taskType (assignment/exam/project/quiz)
- Virtual: daysUntilDeadline, urgencyLevel

### StudyPlan
- userId (ref: User)
- date
- studyBlocks (array of study sessions)
- totalStudyTime, completedStudyTime
- Virtual: progressPercentage

## 🎯 Smart Features

### Attendance Calculation
- Automatically calculates attendance percentage
- Determines status: Safe (≥75%), Warning (65-74%), Critical (<65%)
- Calculates classes needed to reach target percentage

### Study Plan Generation Algorithm
1. Analyzes free time slots between classes
2. Prioritizes subjects based on:
   - Low attendance (high priority)
   - Upcoming exams/assignments
   - Task deadlines
3. Allocates optimal study durations:
   - High priority: 90 minutes
   - Medium priority: 60 minutes
   - Low priority: 45 minutes

### Task Urgency Detection
- Overdue: Past deadline
- Urgent: ≤1 day remaining
- Soon: 2-3 days remaining
- Normal: >3 days remaining

## 🔒 Security
- Passwords hashed using bcryptjs
- JWT-based authentication
- Protected routes with middleware
- Input validation

## 🛠️ Development

### Project Structure
```
server/
├── config/
│   └── db.js              # Database connection
├── controllers/
│   ├── authController.js
│   ├── subjectController.js
│   ├── timetableController.js
│   ├── taskController.js
│   └── studyPlanController.js
├── middleware/
│   └── auth.js            # JWT authentication
├── models/
│   ├── User.js
│   ├── Subject.js
│   ├── Timetable.js
│   ├── Task.js
│   ├── StudyPlan.js
│   └── Notification.js
├── routes/
│   ├── auth.js
│   ├── subjects.js
│   ├── timetable.js
│   ├── tasks.js
│   └── studyplan.js
├── utils/
│   └── generateToken.js
├── .env.example
├── package.json
└── server.js              # Main entry point
```

## 📝 Notes
- All dates should be in ISO 8601 format
- Times should be in HH:MM format (24-hour)
- All responses follow the format: `{ success: boolean, data: any }`
- Errors return: `{ success: false, message: string, error?: any }`

## 🚀 Production Deployment
1. Set `NODE_ENV=production` in .env
2. Use a strong JWT_SECRET
3. Configure MongoDB Atlas for cloud database
4. Enable CORS for your frontend domain only
5. Use environment variables for all sensitive data
