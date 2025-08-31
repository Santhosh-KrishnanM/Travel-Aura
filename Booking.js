const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  tourist:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking_date: { type: Date, required: true },
  total_cost:   { type: Number, required: true },
  status:       { type: String, default: "pending" },
  activities:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Activity' }],
  accommodation:{ type: mongoose.Schema.Types.ObjectId, ref: 'Accommodation' }
});
module.exports = mongoose.model('Booking', bookingSchema);