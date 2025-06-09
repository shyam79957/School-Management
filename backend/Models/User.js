// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ['admin', 'teacher', 'parent'],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
