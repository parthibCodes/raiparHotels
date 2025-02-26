const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const PORT = process.env.PORT || 3000;


const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send("Welcome to the raipar hotel");
});










//Import router files

const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');
//Use the routes
app.use('/person',personRoutes);
app.use('/menu',menuRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




