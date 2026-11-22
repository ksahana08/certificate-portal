const mongoose = require('mongoose');

module.exports = mongoose.model('User', new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rollNo: String,
  department: String,
  role: { type: String, enum: ['student', 'admin'], default: 'student' }
}, { timestamps: true }));