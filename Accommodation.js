const mongoose = require('mongoose');
const accommodationSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  type:    { type: String },
  address: { type: String }
});
module.exports = mongoose.model('Accommodation', accommodationSchema);