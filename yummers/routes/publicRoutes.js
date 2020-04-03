const router = require('express').Router();
module.exports = router;
const mongoose = require('mongoose');

const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');

router.get('/', (req, res) => {

    recipeController.getAllRecipes({}, '', function(dbres) {

        res.render('home', {
            title: 'Yummers!',
            recipes: dbres
        }) 
    });
});

router.get('/form/:type', (req, res) =>  {
	res.render('userforms', {
	title: 'Login/Signup',
	type: req.params.type});
});

//user forms
//login
router.post('/login', function(req, res) {
	
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
router.post('/signup', function(req, res) {
	
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
