const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Home route
app.get('/', (req, res) => {
    res.send('Ajantha Yoga Backend API is running');
});

// Start server
if (require.main === module) {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () =>
        console.log(`Server running on port ${PORT}`)
    );
}

module.exports = app;