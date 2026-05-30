const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const yogaSessionRoutes = require('./routes/yogaSessionRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/yoga-sessions', yogaSessionRoutes);
app.use('/api/bookings', bookingRoutes);

// Home Route
app.get('/', (req, res) => {
    res.send('Ajantha Yoga Backend API is running');
});

// Start Server
if (require.main === module) {
    const PORT = process.env.PORT || 5001;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;