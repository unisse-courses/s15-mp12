//Environment Variables
const {envPort, sessionKey} = require('./config');

//dependencies import
const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const path = require('path');
const helper = require('./helper');

const app = express();
const port = envPort || 9090;

//declare routes
const usersRoute = require('./routes/userRoutes');
const recipesRoute = require('./routes/recipeRoutes');
const publicRoute = require('./routes/publicRoutes');
const cookbookRoute = require('./routes/cookbookRoutes');

//database connect
const database = require('./database');
database.connect();

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

//set static files
app.use(express.static(path.join(__dirname, 'public')));

//set sessions settings
app.use(session({
	secret: sessionKey,
	store: new MongoStore({mongooseConnection: mongoose.connection }),
	resave: false,
	saveUninitialized: true
}));

//set flash
app.use(flash());

app.use((req, res, next) => {
	res.locals.session = req.session;
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	next();
});

//use routes
app.use('/', publicRoute);
app.use('/user', usersRoute);
app.use('/recipes', recipesRoute);
app.use('/cookbook', cookbookRoute);