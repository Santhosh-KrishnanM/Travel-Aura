const mongoose = require('mongoose');
const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }, // e.g. "image1", "image2", etc.
  rating: { type: Number },
  reviews: { type: Number },
  type: { type: String },
  description: { type: String }
});
module.exports = mongoose.model('Destination', destinationSchema);