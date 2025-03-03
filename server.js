const express = require('express');
const app = express();
const db = require('./db');
const passport = require('./auth');
const bcrypt = require('bcrypt');
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//Middleware Function

const logRequest = (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next();//Move on to the next phase
}

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false});

app.get('/', function (req, res) {
    res.send("Welcome to the raipar hotel");
});

//Import router files

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
const Person = require('./models/person');
//Use the routes
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menu',menuRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




