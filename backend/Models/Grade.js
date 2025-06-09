const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  subject: { type: String, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },

  exam: {
    name: { 
      type: String, 
      required: true, 
      enum: ['HalfYearly', 'Quarterly', 'Final', 'Unit Test'] 
    },
    date: { type: Date, required: true }
  },

  marksObtained: { type: Number, required: true },
  totalMarks: { type: Number, required: true },

  grade: { type: String },  // Optional, can be computed
  remarks: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Grade', gradeSchema);
