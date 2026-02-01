const express = require('express');
const {
  getTasks,
  getTasksKanban,
  getUpcomingTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskAnalytics
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getTasks)
  .post(protect, createTask);

router.get('/kanban', protect, getTasksKanban);
router.get('/upcoming', protect, getUpcomingTasks);
router.get('/analytics', protect, getTaskAnalytics);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, deleteTask);

module.exports = router;
