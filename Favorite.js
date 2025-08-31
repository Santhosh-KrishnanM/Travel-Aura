const mongoose = require('mongoose');
const favoriteSchema = new mongoose.Schema({
  tourist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
  added_on: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Favorite', favoriteSchema);