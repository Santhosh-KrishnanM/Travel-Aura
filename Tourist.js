const mongoose = require('mongoose');
const touristSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  address: String
});
module.exports = mongoose.model('Tourist', touristSchema);