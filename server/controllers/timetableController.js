const Timetable = require('../models/Timetable');
const Subject = require('../models/Subject');

// Helper function to get current day
const getCurrentDay = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date().getDay()];
};

// Helper function to compare times
const timeToMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

// @desc    Get all timetable entries
// @route   GET /api/timetable
// @access  Private
const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find({ 
      userId: req.user._id,
      isActive: true 
    }).populate('subjectId');
    
    // Group by day
    const groupedByDay = {};
    timetable.forEach(entry => {
      if (!groupedByDay[entry.day]) {
        groupedByDay[entry.day] = [];
      }
      groupedByDay[entry.day].push(entry);
    });

    // Sort each day's classes by start time
    Object.keys(groupedByDay).forEach(day => {
      groupedByDay[day].sort((a, b) => 
        timeToMinutes(a.startTime) - timeToMinutes(b.startTime)
      );
    });

    res.json({
      success: true,
      data: groupedByDay
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get today's classes
// @route   GET /api/timetable/today
// @access  Private
const getTodayClasses = async (req, res) => {
  try {
    const today = getCurrentDay();
    const currentTime = new Date().toTimeString().slice(0, 5);

    const classes = await Timetable.find({ 
      userId: req.user._id,
      day: today,
      isActive: true 
    }).populate('subjectId').sort({ startTime: 1 });

    const nextClass = classes.find(c => c.startTime > currentTime);
    const currentClass = classes.find(c => 
      c.startTime <= currentTime && c.endTime > currentTime
    );

    res.json({
      success: true,
      data: {
        today,
        allClasses: classes,
        currentClass: currentClass || null,
        nextClass: nextClass || null,
        totalClasses: classes.length
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get next class
// @route   GET /api/timetable/next
// @access  Private
const getNextClass = async (req, res) => {
  try {
    const today = getCurrentDay();
    const currentTime = new Date().toTimeString().slice(0, 5);
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Try to find next class today
    let nextClass = await Timetable.findOne({ 
      userId: req.user._id,
      day: today,
      startTime: { $gt: currentTime },
      isActive: true 
    }).populate('subjectId').sort({ startTime: 1 });

    // If no class today, find next day's first class
    if (!nextClass) {
      const currentDayIndex = days.indexOf(today);
      
      for (let i = 1; i <= 7; i++) {
        const nextDayIndex = (currentDayIndex + i) % 7;
        const nextDay = days[nextDayIndex];
        
        nextClass = await Timetable.findOne({ 
          userId: req.user._id,
          day: nextDay,
          isActive: true 
        }).populate('subjectId').sort({ startTime: 1 });
        
        if (nextClass) break;
      }
    }

    res.json({
      success: true,
      data: nextClass
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Create timetable entry
// @route   POST /api/timetable
// @access  Private
const createTimetableEntry = async (req, res) => {
  try {
    const { subjectId, day, startTime, endTime, room, type } = req.body;

    // Validate required fields
    if (!subjectId || !day || !startTime || !endTime) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Verify subject belongs to user
    const subject = await Subject.findById(subjectId);
    if (!subject || subject.userId.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Check for time conflicts
    const conflict = await Timetable.findOne({
      userId: req.user._id,
      day,
      isActive: true,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }
      ]
    });

    if (conflict) {
      return res.status(400).json({
        success: false,
        message: 'Time slot conflicts with existing class'
      });
    }

    const entry = await Timetable.create({
      userId: req.user._id,
      subjectId,
      day,
      startTime,
      endTime,
      room,
      type
    });

    const populatedEntry = await Timetable.findById(entry._id).populate('subjectId');

    res.status(201).json({
      success: true,
      data: populatedEntry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Update timetable entry
// @route   PUT /api/timetable/:id
// @access  Private
const updateTimetableEntry = async (req, res) => {
  try {
    let entry = await Timetable.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Timetable entry not found'
      });
    }

    if (entry.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    entry = await Timetable.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('subjectId');

    res.json({
      success: true,
      data: entry
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete timetable entry
// @route   DELETE /api/timetable/:id
// @access  Private
const deleteTimetableEntry = async (req, res) => {
  try {
    const entry = await Timetable.findById(req.params.id);

    if (!entry) {
      return res.status(404).json({
        success: false,
        message: 'Timetable entry not found'
      });
    }

    if (entry.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await entry.deleteOne();

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get free slots for a day
// @route   GET /api/timetable/freeslots/:day
// @access  Private
const getFreeSlots = async (req, res) => {
  try {
    const { day } = req.params;
    const classes = await Timetable.find({ 
      userId: req.user._id,
      day,
      isActive: true 
    }).sort({ startTime: 1 });

    const freeSlots = [];
    const dayStart = '08:00';
    const dayEnd = '20:00';

    if (classes.length === 0) {
      freeSlots.push({ startTime: dayStart, endTime: dayEnd, duration: 720 });
    } else {
      // Before first class
      if (classes[0].startTime > dayStart) {
        const duration = timeToMinutes(classes[0].startTime) - timeToMinutes(dayStart);
        freeSlots.push({ 
          startTime: dayStart, 
          endTime: classes[0].startTime,
          duration 
        });
      }

      // Between classes
      for (let i = 0; i < classes.length - 1; i++) {
        const gapStart = classes[i].endTime;
        const gapEnd = classes[i + 1].startTime;
        const duration = timeToMinutes(gapEnd) - timeToMinutes(gapStart);
        
        if (duration > 0) {
          freeSlots.push({ startTime: gapStart, endTime: gapEnd, duration });
        }
      }

      // After last class
      const lastClass = classes[classes.length - 1];
      if (lastClass.endTime < dayEnd) {
        const duration = timeToMinutes(dayEnd) - timeToMinutes(lastClass.endTime);
        freeSlots.push({ 
          startTime: lastClass.endTime, 
          endTime: dayEnd,
          duration 
        });
      }
    }

    res.json({
      success: true,
      data: {
        day,
        freeSlots: freeSlots.filter(slot => slot.duration >= 30) // At least 30 mins
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

module.exports = {
  getTimetable,
  getTodayClasses,
  getNextClass,
  createTimetableEntry,
  updateTimetableEntry,
  deleteTimetableEntry,
  getFreeSlots
};
