const mongoose = require('mongoose');
const recipeModel = require('../models/recipes');
const userModel = require('../models/users');

exports.getAllRecipes = function(req, res) {
    recipeModel.getAll({}, '', function(dbres) {
        res.render('home', {
            title: 'Yummers!',
            recipes: dbres
        }) 
    })
}

exports.getRecipePage = function(req, res) {
    recipeModel.getOne({_id: mongoose.Types.ObjectId( req.params.recipeId)}, '', function(dbres) {
        userModel.getOne({_id: mongoose.Types.ObjectId(dbres.userId)}, 'name', function(username) {
            res.render('recipe', {
                title: dbres.name,
                recipe: dbres,
                username: username.name
            });
        });
    });
}
