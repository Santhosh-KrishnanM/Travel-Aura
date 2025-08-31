const mongoose = require('mongoose');

// Use MONGODB_URI env var for Atlas, fall back to local MongoDB.
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourismApp';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected.');
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

module.exports = mongoose;
