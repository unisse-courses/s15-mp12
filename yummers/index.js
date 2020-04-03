const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');

const path = require('path');
const helper = require('./helper');

const app = express();
const port = 3000;

//declare routes
const usersRoute = require('./routes/userRoutes');
const recipesRoute = require('./routes/recipeRoutes');
const publicRoute = require('./routes/publicRoutes');


//database connection
const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/yummersdb';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(databaseURL, options, function(err, res) {
    if(err) throw err;

    console.log('Database Connected to: ' + databaseURL);
});

//app settings
app.set('view engine', 'hbs');

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultView: 'default',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/',
	helpers: helper
}));

// Configuration for handling API endpoint data
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(port, () => {
	console.log('App listening at port ' + port);
});

//use routes
app.use('/', publicRoute);
app.use('/user', usersRoute);
app.use('/recipes', recipesRoute);

//set static files
app.use(express.static(path.join(__dirname, 'public')));

