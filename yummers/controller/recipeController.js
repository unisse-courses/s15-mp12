const mongoose = require('mongoose');
const recipeModel = require('../models/recipes');
const commentsModel = require('../models/comments');
const {validationResult} = require('express-validator');


exports.addRecipe = function(req, res) {

    const errors = validationResult(req);

    if(errors.isEmpty()) {
        //remove empty inputs
        var quantities;
        var ingredients;
        var steps;

        var ingredientString = [];

        //If more than 1 ingredient
        if(Array.isArray(quantities)) {
            quantities = req.body.quantity.filter(e => e !== '');
            ingredients = req.body.ingredient.filter(e => e !== '');

            //generate array of ingredients string
            quantities.forEach((element, index) => {
                ingredientString.push(element + ' ' + ingredients[index]);
            });
        }
        else {
            quantities = req.body.quantity;
            ingredients = req.body.ingredient;
            ingredientString.push(quantities + ' ' + ingredients);
        }

        //If more than 1 step
        if(Array.isArray(steps))
            var steps = req.body.step.filter(e => e !== '');
        else
            steps = req.body.step;

        var extension = req.file.mimetype.substring(6, req.file.mimetype.length);

        var recipe = recipeModel.create(
            req.body.recName,
            req.body.recipeId,
            req.session.user,
            req.body.servSize,
            ingredientString,
            steps, 
            req.body.cookTime,
            req.body.prepTime,
            extension
        );

        recipeModel.insertOne(recipe, function(dbres) {
            if(dbres != null) console.log('recipe added!');
            res.redirect('/recipes/' + recipe._id);
        });
    }
    else {
        console.log(errors);
    }
};


exports.getAllRecipes = function(req, res) {
    recipeModel.getAll({}, '', function(dbres) {
        res.render('home', {
            title: 'Yummers!',
            recipes: dbres
        });
    })
}

exports.getRecipePage = function(req, res) {
    recipeModel.getOne({_id: mongoose.Types.ObjectId( req.params.recipeId)}, '', function(dbres) {
        commentsModel.getComments({recipe: mongoose.Types.ObjectId( req.params.recipeId)}, '', function(comments) { 
            res.render('recipe', {
                title: dbres.name,
                recipe: dbres,
                comments: comments
            });
        })
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
    

    // recipeModel.updateOne({_id: mongoose.Types.ObjectId(req.params.recipeId)}, newRecipe, function(dbres) {
    //     if(dbres != null) console.log('recipe updated!');
    //     res.status(200).send({recipe: dbres, idString: mongoose.Types.ObjectId(dbres._id).toHexString()});
    // });
}

exports.deleteRecipe = function(req, res) {
    recipeModel.deleteOne({_id: mongoose.Types.ObjectId(req.params.recipeId)}, function(dbres) {
        res.send(dbres);
    });
}