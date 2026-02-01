const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const { status, priority, subjectId } = req.query;
    
    const query = { userId: req.user._id };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (subjectId) query.subjectId = subjectId;

    const tasks = await Task.find(query)
      .populate('subjectId')
      .sort({ deadline: 1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
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

// @desc    Get tasks grouped by status (Kanban view)
// @route   GET /api/tasks/kanban
// @access  Private
const getTasksKanban = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id })
      .populate('subjectId')
      .sort({ deadline: 1 });

    const kanban = {
      todo: tasks.filter(t => t.status === 'todo'),
      'in-progress': tasks.filter(t => t.status === 'in-progress'),
      done: tasks.filter(t => t.status === 'done')
    };

    res.json({
      success: true,
      data: kanban
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

// @desc    Get upcoming tasks
// @route   GET /api/tasks/upcoming
// @access  Private
const getUpcomingTasks = async (req, res) => {
  try {
    const now = new Date();
    const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const tasks = await Task.find({
      userId: req.user._id,
      status: { $ne: 'done' },
      deadline: { $gte: now, $lte: sevenDaysLater }
    }).populate('subjectId').sort({ deadline: 1 });

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
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

// @desc    Create task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
  try {
    const { title, description, deadline, priority, subjectId, taskType } = req.body;

    if (!title || !deadline) {
      return res.status(400).json({
        success: false,
        message: 'Please provide title and deadline'
      });
    }

    const task = await Task.create({
      userId: req.user._id,
      title,
      description,
      deadline,
      priority,
      subjectId,
      taskType
    });

    const populatedTask = await Task.findById(task._id).populate('subjectId');

    res.status(201).json({
      success: true,
      data: populatedTask
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

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // If marking as done, set completedAt
    if (req.body.status === 'done' && task.status !== 'done') {
      req.body.completedAt = new Date();
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('subjectId');

    res.json({
      success: true,
      data: task
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

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found'
      });
    }

    if (task.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await task.deleteOne();

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

// @desc    Get task analytics
// @route   GET /api/tasks/analytics
// @access  Private
const getTaskAnalytics = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });

    const analytics = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'done').length,
      pending: tasks.filter(t => t.status !== 'done').length,
      overdue: tasks.filter(t => t.daysUntilDeadline < 0 && t.status !== 'done').length,
      urgent: tasks.filter(t => t.urgencyLevel === 'urgent' && t.status !== 'done').length,
      byPriority: {
        high: tasks.filter(t => t.priority === 'high').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        low: tasks.filter(t => t.priority === 'low').length
      },
      byType: {
        assignment: tasks.filter(t => t.taskType === 'assignment').length,
        exam: tasks.filter(t => t.taskType === 'exam').length,
        project: tasks.filter(t => t.taskType === 'project').length,
        quiz: tasks.filter(t => t.taskType === 'quiz').length,
        other: tasks.filter(t => t.taskType === 'other').length
      }
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
  getTasks,
  getTasksKanban,
  getUpcomingTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskAnalytics
};
