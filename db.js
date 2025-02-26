const mongoose = require('mongoose');

// Use dotenv to load environment variables if you're using an .env file
require('dotenv').config();

// MongoDB connection URL from environment variable
const mongoURL = process.env.DB_URL;

// Check if mongoURL is available
if (!mongoURL) {
    console.error('MongoDB URI is not defined in environment variables.');
    process.exit(1);  // Exit the process if the DB_URL is not set
}

// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,  // Ensures the connection URL is parsed correctly
    useUnifiedTopology: true,  // Ensures the latest connection behavior
    retryWrites: true,  // Ensure retry writes are enabled (recommended for Atlas)
    w: 'majority',  // Ensures write majority is used (recommended for Atlas)
  })

// Get a default connection
const db = mongoose.connection;

// Connection events
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.log('MongoDB connection error:', err);
    process.exit(1);  // Exit the process if there's a connection error
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;
