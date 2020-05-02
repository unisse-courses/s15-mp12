const mongoose = require('mongoose');
const recipeModel = require('../models/recipes');
const cookbookModel = require('../models/cookbook');
const commentsModel = require('../models/comments');

const {validationResult} = require('express-validator');
const fs = require('fs');

exports.addRecipe = function(req, res) {

    const errors = validationResult(req);

    if(errors.isEmpty()) {
        //remove empty inputs
        var quantities;
        var ingredients;
        var steps;

        var ingredientString = [];

        //If more than 1 ingredient
        if(Array.isArray(req.body.quantity)) {
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

        //get image extension
        var extension = req.file.mimetype.substring(6, req.file.mimetype.length);

        var recipe = recipeModel.create(
            req.body.recName,
            req.body.recipeId,
            req.session.user._id,
            req.body.servSize,
            ingredientString,
            steps, 
            req.body.cookTime,
            req.body.prepTime,
            extension
        );

        //db save
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
        if(req.session.user) {
            cookbookModel.getAll({user: req.session.user._id}, '', function(cookbook) {
                res.render('home', {
                    title: 'Yummers!',
                    recipes: dbres,
                    cookbook: cookbook
                });
            });
        }
        else {
            res.render('home', {
                title: 'Yummers!',
                recipes: dbres
            });
        }
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
            title: 'Edit' + dbres.name,
            recipe: dbres
        })
    });
}

exports.updateRecipe = function(req, res) {

    const errors = validationResult(req);
    
    if(errors.isEmpty()) {
        //remove empty inputs
        var quantities;
        var ingredients;
        var steps;

        var ingredientString = [];

        //If more than 1 ingredient
        if(Array.isArray(req.body.quantity)) {
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

        var recipe = {
            name: req.body.recName,
            servings: req.body.servSize,
            ingredients: ingredientString,
            steps: steps, 
            cookTime: req.body.cookTime,
            prepTime: req.body.prepTime,
        };  

        if(req.file !== undefined) {
            //get image extension
            var extension = req.file.mimetype.substring(6, req.file.mimetype.length);

            recipe.recipePicture = '/img/recipe_' + req.params.recipeId + '.' + extension
        }
        
        recipeModel.updateOne({_id: mongoose.Types.ObjectId(req.params.recipeId)}, recipe, function(dbres) {
            res.redirect('/recipes/' + dbres._id);
        });
    }
    else {
        console.log(errors);
    }
}

exports.deleteRecipe = function(req, res) {
    //delete recipe from db
    recipeModel.deleteOne({_id: mongoose.Types.ObjectId(req.params.recipeId)}, function(dbres) {
        //delete recipe picture from folder
        fs.unlink('./public/img/recipe_' + req.params.recipeId + '.' + req.body.ext, function(err) {
            if(err) throw err;
        });
        res.send(dbres);
    });
}