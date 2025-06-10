const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  email: { type: String, unique: true, required: true },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } // linked after registration
});

module.exports = mongoose.model('Parent', parentSchema);
