// models/Parent.js
const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  phone: { type: String },
  name: {type: String},
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Parent', parentSchema);
