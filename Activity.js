const mongoose = require('mongoose');
const activitySchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  category:    { type: String },
  price:       { type: Number },
  place:       { type: String }
});
module.exports = mongoose.model('Activity', activitySchema);