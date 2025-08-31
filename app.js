// Simple Express server for TravelAura
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const path = require('path');

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB Atlas connection (modern, no deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Atlas connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Import Models
const User = require('./User');
const Tourist = require('./Tourist');
const Activity = require('./Activity');
const Booking = require('./Booking');
const Accommodation = require('./Accommodation');
const Review = require('./Review');
const Favorite = require('./Favorite');
const Destination = require('./Destination');

// ✅ Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ✅ Database status check
app.get('/dbstatus', (req, res) => {
  const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
  res.json({ dbState: states[mongoose.connection.readyState] || 'Unknown' });
});

// ==================== ROUTES ====================

// ➡️ User routes
app.post('/users', async (req, res) => {
  try {
    const { username, email, phone, address, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'username, email and password required' });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });

    const user = new User({ username, email, phone, address, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'email and password required' });

    const user = await User.findOne({ username, password });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    res.json({ message: 'Login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ➡️ Destinations
app.get('/destinations', async (req, res) => {
  try {
    const dests = await Destination.find().lean();
    res.json(dests);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/destinations', async (req, res) => {
  try {
    const d = new Destination(req.body);
    await d.save();
    res.status(201).json(d);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ➡️ Bookings
app.get('/bookings', async (req, res) => {
  try {
    const b = await Booking.find()
      .populate('tourist activities accommodation')
      .lean();
    res.json(b);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/bookings', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ➡️ Activities
app.get('/activities', async (req, res) => {
  try {
    const acts = await Activity.find().lean();
    res.json(acts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ➡️ Reviews
app.post('/reviews', async (req, res) => {
  try {
    const r = new Review(req.body);
    await r.save();
    res.status(201).json(r);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ➡️ Favorites
app.post('/favorites', async (req, res) => {
  try {
    const f = new Favorite(req.body);
    await f.save();
    res.status(201).json(f);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static frontend files
app.use('/', express.static(path.join(__dirname)));

// SPA fallback for frontend routing
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'Not found' });
  res.sendFile(path.join(__dirname, 'travel.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
