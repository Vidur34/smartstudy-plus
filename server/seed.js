require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Models
const User = require('./models/User');
const Subject = require('./models/Subject');
const Timetable = require('./models/Timetable');
const Task = require('./models/Task');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected');
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Subject.deleteMany({});
    await Timetable.deleteMany({});
    await Task.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create demo user
    const hashedPassword = await bcrypt.hash('demo123', 10);
    const user = await User.create({
      name: 'Vidur Kumar',
      email: 'demo@smartstudy.com',
      password: hashedPassword,
      college: 'ABC University',
      semester: 3,
      attendanceCriteria: 75,
      theme: 'light'
    });
    console.log('✓ Created demo user');

    // Create subjects
    const subjects = await Subject.create([
      {
        userId: user._id,
        subjectName: 'Data Structures',
        subjectCode: 'CS201',
        color: '#3B82F6',
        professor: 'Dr. Smith',
        totalClasses: 40,
        attendedClasses: 32
      },
      {
        userId: user._id,
        subjectName: 'Algorithms',
        subjectCode: 'CS202',
        color: '#8B5CF6',
        professor: 'Dr. Johnson',
        totalClasses: 38,
        attendedClasses: 25
      },
      {
        userId: user._id,
        subjectName: 'Database Systems',
        subjectCode: 'CS203',
        color: '#10B981',
        professor: 'Dr. Williams',
        totalClasses: 35,
        attendedClasses: 28
      },
      {
        userId: user._id,
        subjectName: 'Web Development',
        subjectCode: 'CS204',
        color: '#F59E0B',
        professor: 'Dr. Brown',
        totalClasses: 42,
        attendedClasses: 38
      },
      {
        userId: user._id,
        subjectName: 'Operating Systems',
        subjectCode: 'CS205',
        color: '#EF4444',
        professor: 'Dr. Davis',
        totalClasses: 36,
        attendedClasses: 20
      }
    ]);
    console.log('✓ Created subjects');

    // Create timetable entries
    await Timetable.create([
      // Monday
      {
        userId: user._id,
        subjectId: subjects[0]._id,
        day: 'Monday',
        startTime: '09:00',
        endTime: '10:00',
        room: 'Room 101',
        type: 'lecture'
      },
      {
        userId: user._id,
        subjectId: subjects[1]._id,
        day: 'Monday',
        startTime: '11:00',
        endTime: '12:00',
        room: 'Room 203',
        type: 'lecture'
      },
      // Tuesday
      {
        userId: user._id,
        subjectId: subjects[2]._id,
        day: 'Tuesday',
        startTime: '10:00',
        endTime: '11:00',
        room: 'Room 105',
        type: 'lecture'
      },
      {
        userId: user._id,
        subjectId: subjects[3]._id,
        day: 'Tuesday',
        startTime: '14:00',
        endTime: '16:00',
        room: 'Lab 1',
        type: 'lab'
      },
      // Wednesday
      {
        userId: user._id,
        subjectId: subjects[4]._id,
        day: 'Wednesday',
        startTime: '09:00',
        endTime: '10:00',
        room: 'Room 202',
        type: 'lecture'
      },
      {
        userId: user._id,
        subjectId: subjects[0]._id,
        day: 'Wednesday',
        startTime: '15:00',
        endTime: '17:00',
        room: 'Lab 2',
        type: 'lab'
      },
      // Thursday
      {
        userId: user._id,
        subjectId: subjects[1]._id,
        day: 'Thursday',
        startTime: '10:00',
        endTime: '11:00',
        room: 'Room 203',
        type: 'lecture'
      },
      {
        userId: user._id,
        subjectId: subjects[2]._id,
        day: 'Thursday',
        startTime: '13:00',
        endTime: '15:00',
        room: 'Lab 3',
        type: 'lab'
      },
      // Friday
      {
        userId: user._id,
        subjectId: subjects[3]._id,
        day: 'Friday',
        startTime: '09:00',
        endTime: '10:00',
        room: 'Room 105',
        type: 'lecture'
      },
      {
        userId: user._id,
        subjectId: subjects[4]._id,
        day: 'Friday',
        startTime: '11:00',
        endTime: '12:00',
        room: 'Room 202',
        type: 'lecture'
      }
    ]);
    console.log('✓ Created timetable entries');

    // Create tasks
    const today = new Date();
    await Task.create([
      {
        userId: user._id,
        subjectId: subjects[0]._id,
        title: 'Complete Lab Assignment 3',
        description: 'Implement binary search tree with all operations',
        deadline: new Date(today.getTime() + 4 * 24 * 60 * 60 * 1000),
        priority: 'high',
        status: 'todo',
        taskType: 'assignment'
      },
      {
        userId: user._id,
        subjectId: subjects[1]._id,
        title: 'Study for Midterm',
        description: 'Review sorting algorithms and dynamic programming',
        deadline: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
        priority: 'high',
        status: 'in-progress',
        taskType: 'exam'
      },
      {
        userId: user._id,
        subjectId: subjects[2]._id,
        title: 'Database Design Project',
        description: 'Create ER diagram and normalize tables',
        deadline: new Date(today.getTime() + 11 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        status: 'todo',
        taskType: 'project'
      },
      {
        userId: user._id,
        subjectId: subjects[3]._id,
        title: 'React Component Assignment',
        description: 'Build a todo app with hooks',
        deadline: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000),
        priority: 'medium',
        status: 'todo',
        taskType: 'assignment'
      },
      {
        userId: user._id,
        subjectId: subjects[4]._id,
        title: 'Process Scheduling Quiz',
        description: 'Prepare for online quiz on CPU scheduling',
        deadline: new Date(today.getTime() + 5 * 24 * 60 * 60 * 1000),
        priority: 'high',
        status: 'todo',
        taskType: 'quiz'
      }
    ]);
    console.log('✓ Created tasks');

    console.log('\n============================');
    console.log('✓ Database seeded successfully!');
    console.log('============================');
    console.log('\nDemo Credentials:');
    console.log('Email: demo@smartstudy.com');
    console.log('Password: demo123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run
connectDB().then(() => seedData());
