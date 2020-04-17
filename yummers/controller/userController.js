const mongoose = require('mongoose');
const userModel = require('../models/users');
const recipeModel = require('../models/recipes');
const cookbookModel = require('../models/cookbook');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

exports.userForm = function(req, res) {
    res.render('userforms', {
        title: 'Login/Signup',
        type: req.params.type
    });
}

//login user
exports.userLogin = function(req, res) {

	const errors = validationResult(req);

	if(errors.isEmpty()) {
		var user = {
			reqUsername: req.body.username,
			reqPassword: req.body.pass
		}
		userModel.getOne({$or: [{username : user.reqUsername}, {email: user.reqUsername}]}, '', function(dbres) {
			if(dbres == null) {

				req.flash('error_msg', 'Invalid username or email.');
				res.redirect('/form/0');
			}
			else {
				bcrypt.compare(user.reqPassword, dbres.password, (err, result) => {
					if(result) {
						req.session.user = dbres._id;
						req.session.name = dbres.name;

						console.log(req.session);
						res.redirect('/');
					}
					else {
						req.flash('error_msg', 'Incorrect password. Please try again.');
						res.redirect('/form/0');
					}
				});
			}
		});
	}
	else {
		const messages = errors.array().map((item) => item.msg);
		req.flash('error_msg', messages.join(' '));
		res.redirect('/form/0');
	}

}

//signup
exports.addUser = function(req, res) {

	const errors = validationResult(req);

	if(errors.isEmpty()) {
		userModel.getOne({$or: [{email: req.body.email}, {username: req.body.username}]}, '', function(result) {
			if(result) {
				req.flash('error_msg', 'User already exists. Please login.');
				res.redirect('/form/0');
			}
			else
			{
				const saltRounds = 10;

				bcrypt.hash(req.body.pass, saltRounds, (err, hashed) => {
					
				var user = userModel.create(req.body.username, req.body.name, hashed, req.body.email);

				userModel.insertOne(user, function(dbres) {
					if(dbres != null) console.log('user created!');
					res.send({accepted: true});
				});
				});
			}
		});
	}
	else {
		const messages = errors.array().map((item) => item.msg);
		req.flash('error_msg', messages.join(' '));
		res.redirect('/form/1');
	}
}

//logout user
exports.logoutUser = function(req, res) {
	if(req.session) {
		req.session.destroy(() => {
			res.clearCookie('connect.sid');
			res.redirect('/form/0');
		});
	}
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