const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: {type: String},
  gender: { type: String },
  dob: { type: Date },
  address: { type: String },
  phone: { type: String, required: true },
  subjects: [{ type: String }],
  assignedClass: [{ type: String }]
});

module.exports = mongoose.model('Teacher', teacherSchema);
