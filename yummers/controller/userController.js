const mongoose = require('mongoose');
const userModel = require('../models/users');
const recipeModel = require('../models/recipes');
const cookbookModel = require('../models/cookbook');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');

//login page
exports.loginPage = function(req, res) {
	res.render('login', {
		title: 'Login'
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
				res.redirect('/login');
			}
			else {
				bcrypt.compare(user.reqPassword, dbres.password, (err, result) => {
					if(err) throw err;
					if(result) {
						req.session.user = dbres;

						res.redirect('/');
					}
					else {
						req.flash('error_msg', 'Incorrect password. Please try again.');
						res.redirect('/login');
					}
				});
			}
		});
	}
	else {
		const messages = errors.array().map((item) => item.msg);
		req.flash('error_msg', messages.join(' '));
		res.redirect('/login');
	}

}

//signup page
exports.signupPage = function(req, res) {
	res.render('signup', {
		title: 'Signup'
	});
}

//signup
exports.addUser = function(req, res) {

	const errors = validationResult(req);

	if(errors.isEmpty()) {
		userModel.getOne({$or: [{email: req.body.email}, {username: req.body.username}]}, '', function(result) {
			if(result) {
				req.flash('error_msg', 'User already exists. Please login.');
				res.redirect('/login');
			}
			else
			{
				const saltRounds = 10;

				bcrypt.hash(req.body.pass, saltRounds, (err, hashed) => {
					
				var user = userModel.create(req.body.username, req.body.name, hashed, req.body.email);

				userModel.insertOne(user, function(dbres) {
					if(dbres != null) console.log('user created!');
					req.flash('success_msg', "Welcome to Yummers! You may now login!");
					res.redirect('/login');
				});
				});
			}
		});
	}
	else {
		const messages = errors.array().map((item) => item.msg);
		req.flash('error_msg', messages.join(' '));
		res.redirect('/signup');
	}
}

//logout user
exports.logoutUser = function(req, res) {
	if(req.session) {
		req.session.destroy(() => {
			res.clearCookie('connect.sid');
			res.redirect('/login');
		});
	}
}

//get profile page
exports.getProfile = function(req, res) {
	userModel.getOne({_id: mongoose.Types.ObjectId(req.params.userId)}, '', function(dbres) {
		recipeModel.getAll({user: req.params.userId}, '', function(recipe) {
			res.render('profile', {
				user: dbres,
				recipes: recipe
			});
		});
	});
}

//get user recipes for my recipes
exports.getUserRecipes = function(req, res) {
	recipeModel.getAll({user: req.params.userId}, '', function(dbres) {
		res.render('my_recipes', {
			title: 'My Recipes',
			recipes: dbres
		});
	});
}

//add recipe page
exports.createRecipe = function(req, res) {
	res.render('add_recipe', {
		title: 'Add recipe'});
}

exports.editProfilePage = function(req, res) {
	userModel.getOne({_id: mongoose.Types.ObjectId(req.params.userId)}, '', function(user) {
		recipeModel.getAll({user: mongoose.Types.ObjectId(req.params.userId)}, '', function(recipes) {
			res.render('edit_profile', {
				title: 'Edit Profile',
				user: user,
				recipes: recipes					
			});
		});
	});
}

exports.updateUser = function(req, res) {
	const errors = validationResult(req);

	if(errors.isEmpty()) {
		var editPass = req.body.pass;

		const saltRounds = 10;

		bcrypt.hash(editPass, saltRounds, function(err, result) {
			newUser = {
				username: req.body.username,
				name: req.body.name,
				description: req.body.bio,
			}
			//If password was changed
			if(editPass != '')
				newUser.password = result;
				
			//If new image is uploaded
			if(req.file) {
				//save profile pic image path
				var extension = req.file.mimetype.substring(6, req.file.mimetype.length);
				var picPath = 'img/profiles/' + req.params.userId + '.' + extension;

				newUser.profilePic = picPath;
			}
							
			userModel.updateOne({_id : mongoose.Types.ObjectId(req.params.userId)}, newUser, function(dbres) {
				if(dbres != null) console.log('user updated!');
				req.flash('success_msg', 'Profile updated! <a href="/user/' + req.params.userId + '">View here</a>');

				req.session.user = dbres;
		
				res.redirect('/user/' + req.params.userId + '/edit');
			});
		});
	}
	else {
		const messages = errors.array().map((item) => item.msg);
		req.flash('error_msg', messages.join(' '));
		res.redirect("edit");
	}
}

//follow a user
exports.followUser = function(req, res) {
	var follow = {
		follows: req.params.followId
	}
	req.session.user.follows.push(req.params.followId);
	
	userModel.updateOne({_id: req.session.user._id}, {$push: follow}, function(dbres) {
		
		res.send(dbres);
	});
}
