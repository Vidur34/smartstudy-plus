import React, { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Target,
  Bell,
  Settings,
  Sun,
  Moon,
  Menu,
  X,
  Plus,
  Edit2,
  Trash2,
  Search,
  Filter,
  BarChart3,
  PieChart,
} from "lucide-react";

// This is a comprehensive demo of SmartStudy+ showing all major features
// In production, this would be split into multiple components and pages

const SmartStudyDemo = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Demo data
  const [user] = useState({
    name: "Vidur",
    college: "NITH University",
    semester: 3,
    attendanceCriteria: 75,
  });

  const [subjects] = useState([
    {
      id: 1,
      name: "Data Structures",
      code: "CS201",
      color: "#3B82F6",
      total: 40,
      attended: 32,
      professor: "Dr. Smith",
    },
    {
      id: 2,
      name: "Algorithms",
      code: "CS202",
      color: "#8B5CF6",
      total: 38,
      attended: 25,
      professor: "Dr. Johnson",
    },
    {
      id: 3,
      name: "Database Systems",
      code: "CS203",
      color: "#10B981",
      total: 35,
      attended: 28,
      professor: "Dr. Williams",
    },
    {
      id: 4,
      name: "Web Development",
      code: "CS204",
      color: "#F59E0B",
      total: 42,
      attended: 38,
      professor: "Dr. Brown",
    },
    {
      id: 5,
      name: "Operating Systems",
      code: "CS205",
      color: "#EF4444",
      total: 36,
      attended: 20,
      professor: "Dr. Davis",
    },
  ]);

  const [timetable] = useState({
    Monday: [
      {
        subject: "Data Structures",
        time: "09:00 - 10:00",
        room: "Room 101",
        type: "Lecture",
      },
      {
        subject: "Algorithms",
        time: "11:00 - 12:00",
        room: "Room 203",
        type: "Lecture",
      },
    ],
    Tuesday: [
      {
        subject: "Database Systems",
        time: "10:00 - 11:00",
        room: "Room 105",
        type: "Lecture",
      },
      {
        subject: "Web Development",
        time: "14:00 - 16:00",
        room: "Lab 1",
        type: "Lab",
      },
    ],
    Wednesday: [
      {
        subject: "Operating Systems",
        time: "09:00 - 10:00",
        room: "Room 202",
        type: "Lecture",
      },
      {
        subject: "Data Structures",
        time: "15:00 - 17:00",
        room: "Lab 2",
        type: "Lab",
      },
    ],
  });

  const [tasks] = useState([
    {
      id: 1,
      title: "Complete Lab Assignment 3",
      subject: "Data Structures",
      deadline: "2026-02-05",
      priority: "high",
      status: "todo",
      type: "assignment",
    },
    {
      id: 2,
      title: "Study for Midterm",
      subject: "Algorithms",
      deadline: "2026-02-08",
      priority: "high",
      status: "in-progress",
      type: "exam",
    },
    {
      id: 3,
      title: "Database Design Project",
      subject: "Database Systems",
      deadline: "2026-02-12",
      priority: "medium",
      status: "todo",
      type: "project",
    },
    {
      id: 4,
      title: "React Component Assignment",
      subject: "Web Development",
      deadline: "2026-02-15",
      priority: "medium",
      status: "todo",
      type: "assignment",
    },
    {
      id: 5,
      title: "Process Scheduling Quiz",
      subject: "Operating Systems",
      deadline: "2026-02-06",
      priority: "high",
      status: "todo",
      type: "quiz",
    },
  ]);

  // Calculate attendance stats
  const calculateAttendance = (subject) => {
    const percentage = Math.round((subject.attended / subject.total) * 100);
    let status = "safe";
    if (percentage < 65) status = "critical";
    else if (percentage < 75) status = "warning";

    const classesNeeded = Math.ceil(
      (user.attendanceCriteria * subject.total - 100 * subject.attended) /
        (100 - user.attendanceCriteria),
    );

    return { percentage, status, classesNeeded: Math.max(0, classesNeeded) };
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "safe":
        return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "warning":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      case "critical":
        return "text-red-600 bg-red-100 dark:bg-red-900/30";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/30";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30";
      case "low":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  // Components
  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    trend,
    color = "primary",
  }) => (
    <div className="glass-card p-6 hover:shadow-2xl transition-all duration-300 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div
              className={`p-3 rounded-xl bg-${color}-100 dark:bg-${color}-900/30 group-hover:scale-110 transition-transform`}
            >
              <Icon className={`w-6 h-6 text-${color}-600`} />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {title}
            </h3>
          </div>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </p>
          )}
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
          >
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-semibold">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );

  const CircularProgress = ({
    percentage,
    size = 120,
    strokeWidth = 8,
    color = "primary",
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    const colorMap = {
      primary: "#0ea5e9",
      green: "#10b981",
      yellow: "#f59e0b",
      red: "#ef4444",
    };

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorMap[color]}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{percentage}%</span>
        </div>
      </div>
    );
  };

  // Page Components
  const DashboardPage = () => {
    const overallAttendance = Math.round(
      subjects.reduce((sum, s) => sum + calculateAttendance(s).percentage, 0) /
        subjects.length,
    );
    const pendingTasks = tasks.filter((t) => t.status !== "done").length;
    const criticalSubjects = subjects.filter(
      (s) => calculateAttendance(s).status === "critical",
    ).length;

    return (
      <div className="space-y-6 animate-fade-in">
        {/* Greeting Header */}
        <div className="glass-card p-8 bg-gradient-to-br from-primary-500 to-accent-600 text-white">
          <h1 className="text-4xl font-bold mb-2">
            {getGreeting()}, {user.name}! 👋
          </h1>
          <p className="text-xl opacity-90">
            {user.college} • Semester {user.semester}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Target}
            title="Overall Attendance"
            value={`${overallAttendance}%`}
            subtitle={`${user.attendanceCriteria}% required`}
            trend={overallAttendance >= user.attendanceCriteria ? 5 : -3}
          />
          <StatCard
            icon={BookOpen}
            title="Pending Tasks"
            value={pendingTasks}
            subtitle={`${tasks.length} total tasks`}
            color="accent"
          />
          <StatCard
            icon={AlertCircle}
            title="Critical Subjects"
            value={criticalSubjects}
            subtitle="Need attention"
            color="accent"
          />
          <StatCard
            icon={Clock}
            title="Next Class"
            value="09:00 AM"
            subtitle="Data Structures"
            color="accent"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2 glass-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Today's Schedule</h2>
              <span className="text-sm text-gray-500">Monday, Feb 1</span>
            </div>
            <div className="space-y-4">
              {timetable.Monday.map((class_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow"
                >
                  <div className="w-2 h-16 rounded-full bg-primary-500"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{class_.subject}</h3>
                    <p className="text-sm text-gray-500">
                      {class_.room} • {class_.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary-600">
                      {class_.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Overview */}
          <div className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">Attendance</h2>
            <div className="flex flex-col items-center mb-6">
              <CircularProgress percentage={overallAttendance} />
              <p className="mt-4 text-sm text-gray-500">Overall Attendance</p>
            </div>
            <div className="space-y-3">
              {subjects.slice(0, 3).map((subject) => {
                const stats = calculateAttendance(subject);
                return (
                  <div
                    key={subject.id}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">
                        {subject.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(stats.status)}`}
                      >
                        {stats.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                        style={{ width: `${stats.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-6">Upcoming Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter((t) => t.status !== "done")
              .slice(0, 3)
              .map((task) => (
                <div
                  key={task.id}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">{task.title}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {task.subject}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      Due: {new Date(task.deadline).toLocaleDateString()}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded">
                      {task.type}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  const AttendancePage = () => {
    const [localSubjects, setLocalSubjects] = useState(subjects);
    const [showMarkModal, setShowMarkModal] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState(null);

    const handleMarkAttendance = (subjectId, attended) => {
      setLocalSubjects((prev) =>
        prev.map((sub) => {
          if (sub.id === subjectId) {
            return {
              ...sub,
              total: sub.total + 1,
              attended: attended ? sub.attended + 1 : sub.attended,
            };
          }
          return sub;
        }),
      );
      setShowMarkModal(false);
      setSelectedSubject(null);
    };

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Attendance Tracker</h1>
          <button
            onClick={() => setShowMarkModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Mark Attendance
          </button>
        </div>

        {/* Mark Attendance Modal */}
        {showMarkModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Mark Attendance</h2>
                <button
                  onClick={() => setShowMarkModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {localSubjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: subject.color }}
                      ></div>
                      <span className="font-medium">{subject.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkAttendance(subject.id, true)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(subject.id, false)}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm"
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localSubjects.map((subject) => {
            const stats = calculateAttendance(subject);
            return (
              <div
                key={subject.id}
                className="glass-card p-6 hover:shadow-2xl transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{subject.name}</h3>
                    <p className="text-sm text-gray-500">{subject.code}</p>
                  </div>
                  <div
                    className="w-12 h-12 rounded-xl"
                    style={{ backgroundColor: subject.color }}
                  ></div>
                </div>

                <div className="flex justify-center my-6">
                  <CircularProgress
                    percentage={stats.percentage}
                    color={
                      stats.status === "safe"
                        ? "green"
                        : stats.status === "warning"
                          ? "yellow"
                          : "red"
                    }
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Classes
                    </span>
                    <span className="font-semibold">{subject.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Attended
                    </span>
                    <span className="font-semibold text-green-600">
                      {subject.attended}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Absent
                    </span>
                    <span className="font-semibold text-red-600">
                      {subject.total - subject.attended}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stats.status)}`}
                    >
                      {stats.status === "safe"
                        ? "✅ Safe"
                        : stats.status === "warning"
                          ? "⚠️ Warning"
                          : "❌ Critical"}
                    </span>
                  </div>
                  {stats.classesNeeded > 0 && (
                    <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
                      Need to attend {stats.classesNeeded} more class
                      {stats.classesNeeded > 1 ? "es" : ""} to reach{" "}
                      {user.attendanceCriteria}%
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const TimetablePage = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Weekly Timetable</h1>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add Class
        </button>
      </div>

      <div className="glass-card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(timetable).map(([day, classes]) => (
            <div
              key={day}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
            >
              <h3 className="text-xl font-bold mb-4 text-primary-600">{day}</h3>
              <div className="space-y-3">
                {classes.map((class_, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <h4 className="font-semibold mb-1">{class_.subject}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {class_.time}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {class_.room} • {class_.type}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const TasksPage = () => {
    const [localTasks, setLocalTasks] = useState(tasks);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newTask, setNewTask] = useState({
      title: "",
      subject: "",
      deadline: "",
      priority: "medium",
      type: "assignment",
    });

    const handleCreateTask = () => {
      if (!newTask.title || !newTask.deadline) return;

      const task = {
        id: Date.now(),
        title: newTask.title,
        subject: newTask.subject || "General",
        deadline: newTask.deadline,
        priority: newTask.priority,
        status: "todo",
        type: newTask.type,
      };

      setLocalTasks((prev) => [...prev, task]);
      setShowCreateModal(false);
      setNewTask({
        title: "",
        subject: "",
        deadline: "",
        priority: "medium",
        type: "assignment",
      });
    };

    const handleUpdateStatus = (taskId, newStatus) => {
      setLocalTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task,
        ),
      );
    };

    const handleDeleteTask = (taskId) => {
      setLocalTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    const kanban = {
      todo: localTasks.filter((t) => t.status === "todo"),
      "in-progress": localTasks.filter((t) => t.status === "in-progress"),
      done: localTasks.filter((t) => t.status === "done"),
    };

    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Task
          </button>
        </div>

        {/* Create Task Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-card p-6 max-w-md w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Create New Task</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="input-field"
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={newTask.subject}
                    onChange={(e) =>
                      setNewTask({ ...newTask, subject: e.target.value })
                    }
                    className="input-field"
                    placeholder="Enter subject name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Deadline *
                  </label>
                  <input
                    type="date"
                    value={newTask.deadline}
                    onChange={(e) =>
                      setNewTask({ ...newTask, deadline: e.target.value })
                    }
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Priority
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({ ...newTask, priority: e.target.value })
                      }
                      className="input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Type
                    </label>
                    <select
                      value={newTask.type}
                      onChange={(e) =>
                        setNewTask({ ...newTask, type: e.target.value })
                      }
                      className="input-field"
                    >
                      <option value="assignment">Assignment</option>
                      <option value="exam">Exam</option>
                      <option value="project">Project</option>
                      <option value="quiz">Quiz</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    onClick={handleCreateTask}
                    className="btn-primary flex-1"
                  >
                    Create Task
                  </button>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(kanban).map(([status, taskList]) => (
            <div key={status} className="glass-card p-4">
              <h2 className="text-lg font-bold mb-4 capitalize flex items-center gap-2">
                {status === "todo" && "📝"}
                {status === "in-progress" && "⏳"}
                {status === "done" && "✅"}
                {status.replace("-", " ")}
                <span className="ml-auto text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                  {taskList.length}
                </span>
              </h2>
              <div className="space-y-3 min-h-[200px]">
                {taskList.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold flex-1">{task.title}</h3>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {status !== "in-progress" && (
                          <button
                            onClick={() =>
                              handleUpdateStatus(task.id, "in-progress")
                            }
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            title="Move to In Progress"
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        )}
                        {status !== "done" && (
                          <button
                            onClick={() => handleUpdateStatus(task.id, "done")}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                            title="Mark as Done"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {task.subject}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">
                        {new Date(task.deadline).toLocaleDateString()}
                      </span>
                      <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded">
                        {task.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Main render
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const pages = {
    dashboard: <DashboardPage />,
    attendance: <AttendancePage />,
    timetable: <TimetablePage />,
    tasks: <TasksPage />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950/20">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto glass-card rounded-r-3xl">
          <div className="flex items-center justify-between mb-8 px-2">
            <h1 className="text-2xl font-bold gradient-text">SmartStudy+</h1>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {[
              { id: "dashboard", icon: BarChart3, label: "Dashboard" },
              { id: "attendance", icon: CheckCircle2, label: "Attendance" },
              { id: "timetable", icon: Calendar, label: "Timetable" },
              { id: "tasks", icon: BookOpen, label: "Tasks" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentPage === item.id
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "lg:ml-64" : ""} transition-all`}>
        {/* Top Nav */}
        <header className="glass-card sticky top-0 z-30 px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {darkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold">
                {user.name[0]}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{pages[currentPage]}</main>
      </div>
    </div>
  );
};

export default SmartStudyDemo;
