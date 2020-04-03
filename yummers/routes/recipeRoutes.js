const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');

router.get('/', (req, res) => {
    
});

router.get('/:recipeId', (req, res) => {
	
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