const mongoose = require('mongoose');

module.exports = mongoose.model('Request', new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Bonafide', 'Study'], required: true },
  purpose: { type: String, required: true },
  copies: { type: Number, default: 1, min: 1, max: 5 },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Ready', 'Collected'], default: 'Pending' },
  remarks: String,
  readyAt: Date,
  collectedAt: Date
}, { timestamps: true }));