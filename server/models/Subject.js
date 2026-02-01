const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subjectName: {
    type: String,
    required: [true, 'Please add a subject name'],
    trim: true
  },
  subjectCode: {
    type: String,
    trim: true
  },
  totalClasses: {
    type: Number,
    default: 0,
    min: 0
  },
  attendedClasses: {
    type: Number,
    default: 0,
    min: 0
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  professor: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Virtual for attendance percentage
subjectSchema.virtual('attendancePercentage').get(function() {
  if (this.totalClasses === 0) return 0;
  return Math.round((this.attendedClasses / this.totalClasses) * 100);
});

// Virtual for attendance status
subjectSchema.virtual('attendanceStatus').get(function() {
  const percentage = this.attendancePercentage;
  if (percentage >= 75) return 'safe';
  if (percentage >= 65) return 'warning';
  return 'critical';
});

// Method to calculate classes needed for target percentage
subjectSchema.methods.getClassesNeeded = function(targetPercentage = 75) {
  if (this.totalClasses === 0) return 0;
  
  const currentPercentage = (this.attendedClasses / this.totalClasses) * 100;
  if (currentPercentage >= targetPercentage) return 0;
  
  // Formula: (attended + x) / (total + x) = target/100
  // Solving for x: x = (target * total - 100 * attended) / (100 - target)
  const classesNeeded = Math.ceil(
    (targetPercentage * this.totalClasses - 100 * this.attendedClasses) / 
    (100 - targetPercentage)
  );
  
  return Math.max(0, classesNeeded);
};

subjectSchema.set('toJSON', { virtuals: true });
subjectSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Subject', subjectSchema);
