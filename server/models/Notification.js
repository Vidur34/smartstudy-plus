const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
    trim: true
  },
  type: {
    type: String,
    enum: ['class', 'task', 'attendance', 'study', 'general'],
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    // Can reference different models based on type
  },
  relatedModel: {
    type: String,
    enum: ['Timetable', 'Task', 'Subject', 'StudyPlan']
  },
  scheduledTime: {
    type: Date
  },
  isRead: {
    type: Boolean,
    default: false
  },
  isSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ scheduledTime: 1, isSent: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
