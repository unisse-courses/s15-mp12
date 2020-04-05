const mongoose = require('mongoose');
const userModel = require('../models/users');
const recipeModel = require('../models/recipes');
const cookbookModel = require('../models/cookbook');

exports.userForm = function(req, res) {
    res.render('userforms', {
        title: 'Login/Signup',
        type: req.params.type
    });
}

//login user
exports.userLogin = function(req, res) {
    var user = {
		reqUsername: req.body.username,
		reqPassword: req.body.password
	}

    userModel.getOne({$or: [{username : user.reqUsername}, {email: user.reqUsername}], password: user.reqPassword}, 'name', function(dbres) {
        res.status(200).send({user: dbres});
    });
}

//signup
exports.addUser = function(req, res) {

    var user = userModel.create(req.body.username, req.body.name, req.body.pass, req.body.email);

    userModel.insertOne(user, function(dbres) {
		if(dbres != null) console.log('user created!');
		res.send({accepted: true});
    });

}

//get profile page
exports.getProfile = function(req, res) {
    userModel.getOne({_id: mongoose.Types.ObjectId(req.params.userId)}, '', function(dbres) {
		recipeModel.getAll({userId: req.params.userId}, '', function(recipe) {
			res.render('profile', {
				user: dbres,
				recipes: recipe
			});
        });
    });
}

//get user recipes for my recipes
exports.getUserRecipes = function(req, res) {
    recipeModel.getAll({userId: req.params.userId}, '', function(dbres) {
		userModel.getOne({_id: mongoose.Types.ObjectId(req.params.userId)}, '', function(user) {
			res.render('my_recipes', {
				title: 'My Recipes',
				recipes: dbres,
				user: user
            });
        });
	});
}

//add recipe page
exports.createRecipe = function(req, res) {
	res.render('add_recipe', {
	title: 'Add recipe'});
}

//get user's cookbook
exports.getCookbook = function(req, res) {
    //Get Users
	userModel.getAll({}, '', function(user) {

		//Get User's Cookbook
		cookbookModel.getAll({userId: req.params.userId}, 'recipeId', function(recipeId) {

            //create array of recipeId found in cookbook
			var arrId = recipeId.map(query => query.recipeId);
            
            //Get Recipes found in User's Cookbook
			recipeModel.getAll({}, '', function(dbres) {					
				var cookbook = [];

                //if recipe is in cookbook.recipeId, add to arr
				dbres.forEach(recipe => {
					if(arrId.includes(recipe._id.toString())) 
						cookbook.push(recipe);
				});

				res.render('recipebook', {
					title: 'Recipe Book',
					recipes: cookbook,
					users: user
				});
			});
		});
	});
}

exports.editProfilePage = function(req, res) {
	userModel.getOne({_id : mongoose.Types.ObjectId(req.params.userId)}, '', function(dbres) {
		recipeModel.getAll({userId: mongoose.Types.ObjectId(req.params.userId)}, '', function(recipes) {
			res.render('edit_profile', {
				title: 'Edit Profile',
				user: dbres,
				recipes: recipes
			});
		});
	});
}

exports.updateUser = function(req, res) {

	var newUser = {
		username: req.body.username,
		name: req.body.name,
		password: req.body.password
	}
	
	userModel.updateOne({_id : mongoose.Types.ObjectId(req.params.userId)}, newUser, function(dbres) {
		if(dbres != null) console.log('user updated!');
		res.status(200).send({user: dbres});
	
	});
}