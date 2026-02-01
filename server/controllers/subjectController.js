const Subject = require('../models/Subject');

// @desc    Get all subjects for user
// @route   GET /api/subjects
// @access  Private
const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user._id });
    
    res.json({
      success: true,
      count: subjects.length,
      data: subjects
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

// @desc    Get single subject
// @route   GET /api/subjects/:id
// @access  Private
const getSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Make sure user owns subject
    if (subject.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      data: subject
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

// @desc    Create new subject
// @route   POST /api/subjects
// @access  Private
const createSubject = async (req, res) => {
  try {
    const { subjectName, subjectCode, color, professor } = req.body;

    if (!subjectName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide subject name'
      });
    }

    const subject = await Subject.create({
      userId: req.user._id,
      subjectName,
      subjectCode,
      color,
      professor
    });

    res.status(201).json({
      success: true,
      data: subject
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

// @desc    Update subject
// @route   PUT /api/subjects/:id
// @access  Private
const updateSubject = async (req, res) => {
  try {
    let subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Make sure user owns subject
    if (subject.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.json({
      success: true,
      data: subject
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

// @desc    Delete subject
// @route   DELETE /api/subjects/:id
// @access  Private
const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Make sure user owns subject
    if (subject.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await subject.deleteOne();

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

// @desc    Update attendance
// @route   POST /api/subjects/:id/attendance
// @access  Private
const updateAttendance = async (req, res) => {
  try {
    const { attended } = req.body; // true or false

    const subject = await Subject.findById(req.params.id);

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }

    // Make sure user owns subject
    if (subject.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    subject.totalClasses += 1;
    if (attended) {
      subject.attendedClasses += 1;
    }

    await subject.save();

    res.json({
      success: true,
      data: subject
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

// @desc    Get attendance analytics
// @route   GET /api/subjects/analytics/attendance
// @access  Private
const getAttendanceAnalytics = async (req, res) => {
  try {
    const subjects = await Subject.find({ userId: req.user._id });
    
    const analytics = {
      totalSubjects: subjects.length,
      criticalSubjects: subjects.filter(s => s.attendancePercentage < 65).length,
      warningSubjects: subjects.filter(s => s.attendancePercentage >= 65 && s.attendancePercentage < 75).length,
      safeSubjects: subjects.filter(s => s.attendancePercentage >= 75).length,
      averageAttendance: subjects.length > 0 
        ? Math.round(subjects.reduce((sum, s) => sum + s.attendancePercentage, 0) / subjects.length)
        : 0,
      subjects: subjects.map(s => ({
        id: s._id,
        name: s.subjectName,
        percentage: s.attendancePercentage,
        status: s.attendanceStatus,
        classesNeeded: s.getClassesNeeded(req.user.attendanceCriteria || 75)
      }))
    };

    res.json({
      success: true,
      data: analytics
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
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  updateAttendance,
  getAttendanceAnalytics
};
