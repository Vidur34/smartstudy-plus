# SmartStudy+ Frontend

Modern, eye-catching React frontend for the Smart Study Planner application.

## 🎨 Design Features

- **Unique Aesthetic**: Modern glassmorphism design with gradient accents
- **Dark/Light Mode**: Full theme support with smooth transitions
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Animations**: Smooth micro-interactions and page transitions using Framer Motion
- **Custom Typography**: DM Sans + Sora font combination for distinctive look
- **Color Palette**: Blue-purple gradient theme with smart accent colors

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

```bash
cd client
npm install
```

### Development

```bash
npm run dev
```

App will run on `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
client/
├── public/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── layout/
│   │   ├── dashboard/
│   │   ├── attendance/
│   │   ├── timetable/
│   │   └── tasks/
│   ├── pages/              # Page components
│   │   ├── Landing.jsx
│   │   ├── Auth.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Attendance.jsx
│   │   ├── Timetable.jsx
│   │   ├── Tasks.jsx
│   │   └── StudyPlan.jsx
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React Context API
│   ├── utils/              # Helper functions
│   ├── services/           # API services
│   ├── App.jsx             # Main app component (demo included)
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## 🎯 Features Implemented

### 1. Landing Page
- Hero section with animated elements
- Feature showcase cards
- Call-to-action buttons
- Responsive design

### 2. Authentication
- Login/Register forms
- Form validation
- JWT token management
- Protected routes

### 3. Dashboard
- Personalized greeting
- Quick stats overview
- Today's schedule
- Attendance summary
- Upcoming tasks preview
- Circular progress indicators

### 4. Attendance Tracker
- Subject-wise attendance cards
- Visual percentage indicators
- Status badges (Safe/Warning/Critical)
- Classes needed calculator
- One-click attendance marking

### 5. Timetable Manager
- Weekly timetable grid view
- Color-coded subjects
- Today's classes highlight
- Next class indicator
- Free slot calculator
- Add/Edit/Delete classes

### 6. Task Manager
- Kanban board (To-Do/In Progress/Done)
- Priority labels
- Deadline countdown
- Task filtering
- Quick task creation
- Drag-and-drop support

### 7. Smart Study Planner
- Auto-generated study plans
- Free time optimization
- Priority-based scheduling
- Progress tracking
- Editable study blocks

## 🎨 UI Components

### Custom Components
- `StatCard` - Dashboard statistics
- `CircularProgress` - Attendance visualization
- `GlassCard` - Glassmorphism container
- `Button` - Primary/Secondary buttons
- `Input` - Styled form inputs
- `Modal` - Popup dialogs
- `Notification` - Toast messages

### Color System
```css
Primary: Blue (#0ea5e9)
Accent: Purple (#a855f7)
Success: Green (#10b981)
Warning: Yellow (#f59e0b)
Error: Red (#ef4444)
```

## 🔧 Technologies

- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router** - Navigation
- **Axios** - API calls
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **date-fns** - Date manipulation

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Mobile landscape */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Extra large */
```

## 🎭 Theming

Toggle between light and dark mode with the theme switcher. Theme preference is saved to localStorage.

```javascript
// In any component
const [darkMode, setDarkMode] = useState(false);

// Toggle theme
setDarkMode(!darkMode);
```

## 🔌 API Integration

The app connects to the backend API at `http://localhost:5000/api`

### Example API Call
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token
api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// Make request
const response = await api.get('/subjects');
```

## ✨ Key Features

### Smart Attendance Tracking
- Real-time percentage calculation
- Visual status indicators
- Predictive class requirements
- Attendance trends

### Intelligent Study Planning
- Analyzes free time between classes
- Prioritizes based on:
  - Low attendance subjects
  - Upcoming exam dates
  - Assignment deadlines
- Optimal time allocation

### Task Prioritization
- Automatic urgency detection
- Deadline tracking
- Subject categorization
- Status management

## 🎬 Animations

Uses Framer Motion for smooth animations:

```javascript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## 🚀 Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Memoization with useMemo/useCallback
- Virtual scrolling for long lists
- Debounced search inputs

## 🔒 Security

- JWT token storage in httpOnly cookies (recommended)
- XSS protection
- CSRF tokens
- Input sanitization
- Secure API communication (HTTPS in production)

## 📊 Charts & Visualizations

Uses Recharts for data visualization:
- Attendance trends
- Task completion rates
- Study time analytics
- Subject performance

## 🌐 Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=SmartStudy+
```

Access in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

## 🎯 Future Enhancements

- [ ] Push notifications
- [ ] Google Calendar integration
- [ ] Voice reminders
- [ ] Gamification (badges, streaks)
- [ ] Study groups/collaboration
- [ ] AI-powered study recommendations
- [ ] Offline mode with PWA
- [ ] Mobile app (React Native)

## 🐛 Debugging

Enable React DevTools for debugging:
- Components tab
- Profiler tab
- Console logs

```javascript
if (import.meta.env.DEV) {
  console.log('Debug info:', data);
}
```

## 📝 License

This project is part of SmartStudy+ full-stack application.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ for students, by students
