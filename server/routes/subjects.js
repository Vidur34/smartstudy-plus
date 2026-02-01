const express = require('express');
const {
  getSubjects,
  getSubject,
  createSubject,
  updateSubject,
  deleteSubject,
  updateAttendance,
  getAttendanceAnalytics
} = require('../controllers/subjectController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(protect, getSubjects)
  .post(protect, createSubject);

router.get('/analytics/attendance', protect, getAttendanceAnalytics);

router.route('/:id')
  .get(protect, getSubject)
  .put(protect, updateSubject)
  .delete(protect, deleteSubject);

router.post('/:id/attendance', protect, updateAttendance);

module.exports = router;
