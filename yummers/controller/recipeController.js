const mongoose = require('mongoose');
const recipeModel = require('../models/recipes');
const userModel = require('../models/users');

exports.addRecipe = function(req, res) {
    var recipe = recipeModel.create(
        req.body.name,
        '5e7dc8032d173236e070f966',
        req.body.serveSize,
        req.body.source,
        req.body.ingredients,
        req.body.preparations);
    
    recipeModel.insertOne(recipe, function(dbres) {
        if(dbres != null) console.log('recipe added!');
        res.status(200).send({recipe: dbres, idString: mongoose.Types.ObjectId(dbres._id).toHexString()});
    });

};


exports.getAllRecipes = function(req, res) {
    recipeModel.getAll({}, '', function(dbres) {
        userModel.getAll({}, '', function(result) {
            res.render('home', {
                title: 'Yummers!',
                recipes: dbres,
                users: result
            });
        }); 
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

exports.editRecipePage = function(req, res) {
    recipeModel.getOne({_id: mongoose.Types.ObjectId( req.params.recipeId)}, '', function(dbres) {
        res.render('add_recipe', {
            recipe: dbres
        })
    });
}

exports.updateRecipe = function(req, res) {
    var newRecipe = {
        name: req.body.name,
        userId: '5e7dc8032d173236e070f966',
        servings: req.body.serveSize,
        ingredients: req.body.ingredients,
        preparation: req.body.preparations
    };
    

    recipeModel.updateOne({_id: mongoose.Types.ObjectId(req.params.recipeId)}, newRecipe, function(dbres) {
        if(dbres != null) console.log('recipe updated!');
        res.status(200).send({recipe: dbres, idString: mongoose.Types.ObjectId(dbres._id).toHexString()});
    });
}