const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
let user = require('./models/model.js');
const routes = require('./router/routes');
const PORT = 4000;

const todoRoutes = express.Router();
app.use(cors());
app.use(bodyParser.json());

/***************Mongodb configuratrion********************/
var mongoose = require('mongoose');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url, { useNewUrlParser: true });

/***************check mongoDB connection status********************/
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

/***************passport.js setup********************/
app.use(passport.initialize());
require('./config/passport')(passport)

//  Connect all our routes to our application
app.use('/', routes);


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});