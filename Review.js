const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
  tourist:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  activity:    { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
  rating:      { type: Number },
  comment:     { type: String },
  review_date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Review', reviewSchema);