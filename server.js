const express = require('express');
const app = express();
const db = require('./db');



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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});




