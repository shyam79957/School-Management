const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNumber: { type: Number, unique: true },
  name: { type: String, required: true },
  gender: { type: String },
  class: {type: String, required: true},
  dob: { type: Date },
  address: { type: String },
});

// Auto-increment roll number
studentSchema.pre('save', async function (next) {
  if (this.isNew) {
    const last = await mongoose.model('Student').findOne().sort('-rollNumber');
    this.rollNumber = last ? last.rollNumber + 1 : 1;
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
