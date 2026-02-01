"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    semester: 2,
    attendanceCriteria: 70,
  });

  const [subjects] = useState([
    {
      id: 1,
      name: "MECHANICAL",
      code: "ME101",
      color: "#3B82F6",
      total: 40,
      attended: 32,
      professor: "Dr. SHUSHANT",
    },
    {
      id: 2,
      name: "MATHEMATICS",
      code: "CS202",
      color: "#8B5CF6",
      total: 38,
      attended: 25,
      professor: "Dr. SUKET",
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

  const [stats] = useState(
    subjects.map((subject) => calculateAttendance(subject)),
  );
  const [isSubjHovering, setIsSubjHovering] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getAIInsight = (stats) => {
    if (stats.status === "safe") {
      return `🧠 SmartStudy Insight: You can bunk ${stats.classesNeeded} class${
        stats.classesNeeded !== 1 ? "es" : ""
      } safely`;
    }

    if (stats.status === "warning") {
      return `⚠️ SmartStudy Insight: Attend ${stats.classesNeeded} more class${
        stats.classesNeeded !== 1 ? "es" : ""
      } to stay safe`;
    }

    return "❌ SmartStudy Insight: Attendance critical — no bunking allowed";
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
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/40";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const Card3D = ({ children, className = "" }) => {
    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -15;
      const rotateY = (x / rect.width - 0.5) * 15;

      setStyle({
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`,
        boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
      });
    };

    const reset = () => {
      setStyle({
        transform: "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      });
    };

    return (
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={reset}
        style={style}
        className={`transition-all duration-300 rounded-3xl ${className}`}
      >
        {children}
      </div>
    );
  };

  // Components
  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    trend,
    color = "primary",
    index = 0,
  }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
        whileHover={{ translateY: -5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`glass-card p-6 hover:shadow-2xl transition-all duration-300 group ${
          isHovered ? "bg-primary-100 dark:bg-primary-900/30" : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                className={`p-3 rounded-xl bg-${color}-100 dark:bg-${color}-900/30 group-hover:scale-110 transition-transform`}
                whileHover={{ scale: 1.2, rotate: 5 }}
              >
                <Icon className={`w-6 h-6 text-${color}-600`} />
              </motion.div>
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {title}
              </h3>
            </div>
            <motion.p
              className="text-3xl font-bold text-gray-900 dark:text-white mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {value}
            </motion.p>
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {subtitle}
              </p>
            )}
          </div>
          {trend && (
            <motion.div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg ${trend > 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-xs font-semibold">{Math.abs(trend)}%</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

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
      <motion.div
        className="relative inline-flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
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
          <motion.circle
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
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {percentage}%
          </motion.span>
        </div>
      </motion.div>
    );
  };

  // Page Components
  const DashboardPage = () => {
    const overallAttendance = Math.round(
      stats.reduce((sum, s) => sum + s.percentage, 0) / stats.length,
    );
    const pendingTasks = tasks.filter((t) => t.status !== "done").length;
    const criticalSubjects = stats.filter(
      (s) => s.status === "critical",
    ).length;

    return (
      <motion.div className="space-y-6">
        {/* Greeting Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-card p-8 bg-gradient-to-br from-primary-500 to-accent-600 text-white overflow-hidden relative"
        >
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <div className="relative z-10">
            <motion.h1
              className="text-4xl font-bold mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {getGreeting()}, {user.name}! 👋
            </motion.h1>
            <motion.p
              className="text-xl opacity-90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {user.college} • Semester {user.semester}
            </motion.p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Target}
            title="Overall Attendance"
            value={`${overallAttendance}%`}
            subtitle={`${user.attendanceCriteria}% required`}
            trend={overallAttendance >= user.attendanceCriteria ? 5 : -3}
            index={0}
          />
          <StatCard
            icon={BookOpen}
            title="Pending Tasks"
            value={pendingTasks}
            subtitle={`${tasks.length} total tasks`}
            color="accent"
            index={1}
          />
          <StatCard
            icon={AlertCircle}
            title="Critical Subjects"
            value={criticalSubjects}
            subtitle="Need attention"
            color="accent"
            index={2}
          />
          <StatCard
            icon={Clock}
            title="Next Class"
            value="09:00 AM"
            subtitle="Data Structures"
            color="accent"
            index={3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Today's Schedule</h2>
              <span className="text-sm text-gray-500">Monday, Feb 1</span>
            </div>
            <div className="space-y-4">
              {timetable.Monday.map((class_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ x: 10, transition: { duration: 0.2 } }}
                  className={`flex items-center gap-4 p-4 rounded-xl hover:shadow-md transition-all bg-gray-50 dark:bg-gray-800`}
                >
                  <motion.div
                    className="w-2 h-16 rounded-full bg-primary-500"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.4 }}
                  ></motion.div>
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
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Attendance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-6"
          >
            <h2 className="text-2xl font-bold mb-6">Attendance</h2>
            <div className="flex flex-col items-center mb-6">
              <CircularProgress percentage={overallAttendance} />
              <motion.p
                className="mt-4 text-sm text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Overall Attendance
              </motion.p>
            </div>
            <div className="space-y-3">
              {subjects.slice(0, 3).map((subject, idx) => {
                const stat = stats[idx];
                return (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
                    onMouseEnter={() => setIsSubjHovering(true)}
                    onMouseLeave={() => setIsSubjHovering(false)}
                    className={`p-3 rounded-lg transition-all ${
                      isSubjHovering
                        ? "bg-accent-100 dark:bg-accent-900/40 text-accent-900 dark:text-accent-100"
                        : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">
                        {subject.name}
                      </span>
                      <motion.span
                        className={`text-xs px-2 py-1 rounded-full ${getStatusColor(stat.status)}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + idx * 0.1 + 0.2 }}
                      >
                        {stat.percentage}%
                      </motion.span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${stat.percentage}%` }}
                        transition={{
                          delay: 0.6 + idx * 0.1 + 0.3,
                          duration: 0.8,
                        }}
                      ></motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Upcoming Tasks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass-card p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Upcoming Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {tasks
              .filter((t) => t.status !== "done")
              .slice(0, 3)
              .map((task, idx) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                  className={`p-4 border rounded-xl hover:shadow-lg transition-all ${
                    task.status === "todo"
                      ? "bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-100"
                      : task.status === "in-progress"
                        ? "bg-yellow-100 dark:bg-yellow-900/40 border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100"
                        : "bg-green-100 dark:bg-green-900/40 border-green-300 dark:border-green-700 text-green-900 dark:text-green-100"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold">{task.title}</h3>
                    <motion.span
                      className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 + idx * 0.1 + 0.2 }}
                    >
                      {task.priority}
                    </motion.span>
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
                </motion.div>
              ))}
          </div>
        </motion.div>
      </motion.div>
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
      <motion.div className="space-y-6">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">Attendance Tracker</h1>
          <motion.button
            onClick={() => setShowMarkModal(true)}
            className="btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Plus className="w-5 h-5" />
            Mark Attendance
          </motion.button>
        </motion.div>

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
          {localSubjects.map((subject, idx) => {
            const stat = stats[idx];
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
              >
                <Card3D className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
                  {/* Colored Header Bar */}
                  <div
                    className="h-2 w-full"
                    style={{ backgroundColor: subject.color }}
                  ></div>

                  <div className="p-6">
                    {/* Subject Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {subject.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {subject.code} • {subject.professor}
                        </p>
                      </div>
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
                        style={{ backgroundColor: subject.color }}
                      >
                        {stat.percentage}%
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(stat.status)}`}
                      >
                        {stat.status === "safe"
                          ? "✅ Safe Zone"
                          : stat.status === "warning"
                            ? "⚠️ At Risk"
                            : "❌ Critical"}
                      </span>
                    </div>
                    {/* AI Insight */}
                    <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 border border-indigo-200 dark:border-indigo-800">
                      <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                        {getAIInsight(stat)}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-2">
                        <span>Attendance Progress</span>
                        <span className="font-semibold">
                          {subject.attended}/{subject.total} classes
                        </span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 shadow-sm"
                          style={{
                            width: `${stat.percentage}%`,
                            backgroundColor: subject.color,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 border border-green-200 dark:border-green-800">
                        <p className="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
                          Present
                        </p>
                        <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                          {subject.attended}
                        </p>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 border border-red-200 dark:border-red-800">
                        <p className="text-xs text-red-600 dark:text-red-400 font-medium mb-1">
                          Absent
                        </p>
                        <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                          {subject.total - subject.attended}
                        </p>
                      </div>
                    </div>

                    {/* Warning Message */}
                    {stat.classesNeeded > 0 && (
                      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-3 mb-4">
                        <p className="text-xs text-amber-800 dark:text-amber-200">
                          📚 Attend{" "}
                          <span className="font-bold">
                            {stat.classesNeeded} more class
                            {stat.classesNeeded > 1 ? "es" : ""}
                          </span>{" "}
                          to reach {user.attendanceCriteria}%
                        </p>
                      </div>
                    )}

                    {/* Quick Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkAttendance(subject.id, true)}
                        className="flex-1 bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(subject.id, false)}
                        className="flex-1 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Absent
                      </button>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    );
  };

  const TimetablePage = () => (
    <motion.div className="space-y-6">
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold">Weekly Timetable</h1>
        <motion.button
          className="btn-primary flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Plus className="w-5 h-5" />
          Add Class
        </motion.button>
      </motion.div>

      <motion.div
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(timetable).map(([day, classes], dayIdx) => (
            <motion.div
              key={day}
              className={`border rounded-xl p-4 transition-all`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + dayIdx * 0.1, duration: 0.6 }}
            >
              <h3 className="text-xl font-bold mb-4 text-primary-600">{day}</h3>
              <div className="space-y-3">
                {classes.map((class_, idx) => (
                  <motion.div
                    key={idx}
                    className="p-3 rounded-lg transition-all"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.4 + dayIdx * 0.1 + idx * 0.05,
                      duration: 0.5,
                    }}
                  >
                    <h4 className="font-semibold mb-1">{class_.subject}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {class_.time}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {class_.room} • {class_.type}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
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
      <motion.div className="space-y-6">
        <motion.div
          className="flex items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold">Task Manager</h1>
          <motion.button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Plus className="w-5 h-5" />
            New Task
          </motion.button>
        </motion.div>

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
          {Object.entries(kanban).map(([status, taskList], statusIdx) => (
            <motion.div
              key={status}
              className={`glass-card p-4 transition-all`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + statusIdx * 0.1, duration: 0.6 }}
            >
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
                {taskList.map((task, taskIdx) => (
                  <motion.div
                    key={task.id}
                    className={`p-4 border rounded-lg hover:shadow-md transition-all group`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.3 + statusIdx * 0.1 + taskIdx * 0.05,
                      duration: 0.5,
                    }}
                    whileHover={{ y: -2, transition: { duration: 0.2 } }}
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  };

  // Main render
  const pages = {
    dashboard: <DashboardPage />,
    attendance: <AttendancePage />,
    timetable: <TimetablePage />,
    tasks: <TasksPage />,
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-950 dark:to-blue-950/20">
      {/* Sidebar */}
      <motion.aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
        initial={{ x: -256 }}
        animate={{ x: sidebarOpen ? 0 : -256 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="h-full px-3 py-4 overflow-y-auto glass-card rounded-r-3xl">
          <motion.div
            className="flex items-center justify-between mb-8 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h1
              className="text-2xl font-bold gradient-text"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              SmartStudy+
            </motion.h1>
            <motion.button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>
          </motion.div>

          <nav className="space-y-2">
            {[
              { id: "dashboard", icon: BarChart3, label: "Dashboard" },
              { id: "attendance", icon: CheckCircle2, label: "Attendance" },
              { id: "timetable", icon: Calendar, label: "Timetable" },
              { id: "tasks", icon: BookOpen, label: "Tasks" },
            ].map((item, idx) => (
              <motion.button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentPage === item.id
                    ? "bg-primary-500 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + idx * 0.05 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.id === "tasks" && currentPage === "tasks" ? (
                  <motion.div
                    animate={{ rotateY: [0, 180, 360] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <item.icon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <item.icon className="w-5 h-5" />
                )}
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`${sidebarOpen ? "lg:ml-64" : ""} transition-all`}>
        {/* Top Nav */}
        <motion.header
          className="glass-card sticky top-0 z-30 px-6 py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>

            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.button
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 relative"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Bell className="w-6 h-6" />
                <motion.span
                  className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                ></motion.span>
              </motion.button>
              <motion.button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                whileHover={{ scale: 1.1, rotate: 20 }}
                whileTap={{ scale: 0.9 }}
              >
                {darkMode ? (
                  <Sun className="w-6 h-6" />
                ) : (
                  <Moon className="w-6 h-6" />
                )}
              </motion.button>
              <motion.div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                {user.name[0]}
              </motion.div>
            </motion.div>
          </div>
        </motion.header>

        {/* Page Content */}
        <main className="p-6 cursor-circle">{pages[currentPage]}</main>
      </div>
    </div>
  );
};

export default SmartStudyDemo;
