const express = require('express');
const {
  getTimetable,
  getTodayClasses,
  getNextClass,
  createTimetableEntry,
  updateTimetableEntry,
  deleteTimetableEntry,
  getFreeSlots
} = require('../controllers/timetableController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getTimetable)
  .post(protect, createTimetableEntry);

router.get('/today', protect, getTodayClasses);
router.get('/next', protect, getNextClass);
router.get('/freeslots/:day', protect, getFreeSlots);

router.route('/:id')
  .put(protect, updateTimetableEntry)
  .delete(protect, deleteTimetableEntry);

module.exports = router;
