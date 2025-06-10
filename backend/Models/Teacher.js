const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String },
  gender: { type: String },
  email: { type: String, unique: true, required: true },
  dob: { type: Date },
  address: { type: String },
  phone: { type: String, required: true },
  subjects: [{ type: String }],
  assignedClass: [{ type: String }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // added later after registration
});

module.exports = mongoose.model('Teacher', teacherSchema);
