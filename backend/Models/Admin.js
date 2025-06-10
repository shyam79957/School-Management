const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null, unique: true } // optional link to User
});

module.exports = mongoose.model('Admin', adminSchema);
