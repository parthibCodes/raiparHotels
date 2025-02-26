const mongoose = require('mongoose');

//Define MongoDB connection URL

// const mongoURL = 'mongodb://localhost:27017/raiparHotels';
const mongoURL = process.env.DB_URL;
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

//Get a default connection
//Mongoose maintains a default connection object representing object representing the MongoDB connection

const db = mongoose.connection;

db.on('connected',()=>{
    console.log('Connected to mongodb server');
});

db.on('error',(err)=>{
    console.log('MongoDB connection error' + err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
});

//Export database connection

module.exports = db;