const router = require('express').Router();
module.exports = router;

const mongoose = require('mongoose');

const userController = require('../controller/userController');
const recipeController = require('../controller/recipeController');
const cookbookController = require('../controller/cookbookController');

router.get('/:userId', (req, res) => {
	userController.getOne({_id: mongoose.Types.ObjectId(req.params.userId)}, '', function(dbres) {
		recipeController.getAllRecipes({userId: req.params.userId}, '', function(recipe) {
			res.render('profile', {
				user: dbres,
				recipes: recipe
			});
		});
	});
});

router.get('/:userId/add', (req, res) =>  {
	res.render('add_recipe', {
	title: 'Add recipe'});
});

router.get('/:userId/recipes', (req, res) =>  {
	recipeController.getAllRecipes({userId: req.params.userId}, '', function(dbres) {
		userController.getOne({_id: mongoose.Types.ObjectId(req.params.userId)}, '', function(user) {
			cookbookController.getAllRecipes({userId: req.params.userId}, 'recipeId', function(recipeId) {
				
			})
				res.render('my_recipes', {
					title: 'My Recipes',
					recipes: dbres,
					user: user
				});
		});
	});
});

router.get('/:userId/cookbook', (req, res) => {
	//Get User
	userController.getOne({_id: mongoose.Types.ObjectId(req.params.userId)}, '', function(user) {
		//Get User's Cookbook
		cookbookController.getAllRecipes({userId: req.params.userId}, 'recipeId', function(recipeId) {

			var arrId = recipeId.map(query => query.recipeId);
			//Get Recipes found in User's Cookbook
			recipeController.getAllRecipes({}, '', function(dbres) {					
				var cookbook = [];

				dbres.forEach(recipe => {
					if(arrId.includes(recipe._id.toString())) 
						cookbook.push(recipe);
				});

				res.render('recipebook', {
					title: 'Recipe Book',
					recipes: cookbook,
					user: user
				});
			});
		});
	});
});