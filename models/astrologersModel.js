const mongoose = require('mongoose');

const astrologerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  flowFactor: { type: Number, default: 1 },
  connectionCount: { type: Number, default: 0 },
  isEnabled: { type: Boolean, default: true }
});

module.exports = mongoose.model('Astrologer', astrologerSchema);
