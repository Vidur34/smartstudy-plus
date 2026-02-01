const express = require('express');
const {
  generateStudyPlan,
  getStudyPlan,
  updateStudyBlock
} = require('../controllers/studyPlanController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/generate', protect, generateStudyPlan);
router.get('/:date', protect, getStudyPlan);
router.put('/:id/block/:blockIndex', protect, updateStudyBlock);

module.exports = router;
