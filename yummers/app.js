const express = require('express');
const hbs = require('express-handlebars');
const handlebars = require('handlebars');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const path = require('path');
const helper = require('./helper');
const app = express();
const port = 9090;

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

//mongodb
const mongoClient = mongodb.MongoClient;
const databaseURL = "mongodb://localhost:27017/";
const dbname =  "yummersdb";


//create users collection to mongodb
mongoClient.connect(databaseURL, function(err, db) {
    if(err) throw err;
    const dbo = db.db(dbname);

    dbo.createCollection('users', function(err, res) {
        if(err) throw err;
        console.log('Users collection created!');
        db.close();
    });
});

//Insert all users (Use this to insert the current user data to your db, dont forget to put comments after inserting para di mag repeat)

// mongoClient.connect(databaseURL, function(err, db) {
// 	if(err) throw err;
// 	const dbo = db.db(dbname);
// 	const collection = dbo.collection('users');

// 	collection.insertMany(users, function(err, res) {
// 		if(err) throw err;

// 		console.log('inserted users!');
// 		db.close();
// 	})
// });

app.listen(port, () => {
	console.log('App listening at port ' + port);
});

//routes
app.get('/', (req, res) => {
	mongoClient.connect(databaseURL, function(err, db) {
		if(err) throw err;
		const dbo = db.db(dbname);
		const collection = dbo.collection('users');

		//get all users from mongodb then send to home page
		collection.find({}).toArray(function(err, dbres) {
			if(err) throw err;

			res.render('home', {
				title: 'Yummers!',
				users : dbres
			});

		});
	});
});

app.get('/user/:userId', (req, res) => {
	mongoClient.connect(databaseURL, function(err, db) {
		if(err) throw err;
		const dbo = db.db(dbname);
		const collection = dbo.collection('users');

		//find the specific user given the userId sa route/URL
		collection.findOne({_id : mongodb.ObjectId(req.params.userId)}, function(err, dbres) {
			if(err) throw err;

			res.render('profile', {
				user: dbres	//dbres is database result(matched user given the parameter id)
			});
		});
	});
});

app.get('/form/:type', (req, res) =>  {
	res.render('userforms', {
	title: 'Login/Signup',
	type: req.params.type});
});

app.get('/add_recipe', (req, res) =>  {
	res.render('add_recipe', {
	title: 'Add recipe'});
});

app.get('/user/:userId/recipe/:recipeId', (req, res) => {
	
	mongoClient.connect(databaseURL, function(err, db) {
		if(err) throw err;
		const dbo = db.db(dbname);
		const collection = dbo.collection('users');

		//find the specific user given the userId sa route/URL
		collection.findOne({_id : mongodb.ObjectId(req.params.userId)}, function(err, dbres) {
			if(err) throw err;

			res.render('recipe', {	//Find the specific recipe from the user(dbres - database result/matched user given the id sa parameter) 
				recipe: dbres.recipes.find(element => {	//dbres.recipes is the array of recipes ng user
					return element.id == parseInt(req.params.recipeId);
				}),
				username: dbres.name,
				userId: dbres._id
			});
		});
	});
});

//user forms
//login
app.post('/login', function(req, res) {
	
	var user = {
		reqUsername: req.body.username,
		reqPassword: req.body.password
	}

	mongoClient.connect(databaseURL, function(err, db) {
		if(err) throw err;
		const dbo = db.db(dbname);
		const collection = dbo.collection('users');

		collection.findOne({username : user.reqUsername, password : user.reqPassword}, (err, result) => {
			if(err) throw err;

			res.send({user: result});
			db.close();
		})
	});
})


//signup
app.post('/signup', function(req, res) {
	
	var user = {
		username: req.body.username,
		name: req.body.name,
		joinDate: new Date(),
		pass: req.body.pass,
		email: req.body.email,
		recipes: null
	}

	mongoClient.connect(databaseURL, function(err, db) {
		if(err) throw err;
		const dbo = db.db(dbname);
		const collection = dbo.collection('users');

		collection.insertOne(user, function(err, dbres) {
			if(err) throw err;

			res.status(200).send({accepted : true});
		})
	});
})



//set static files
app.use(express.static(path.join(__dirname, 'public')));

