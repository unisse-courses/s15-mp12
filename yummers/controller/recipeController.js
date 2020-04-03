const recipeModel = require('../models/recipes');

exports.create = function(newRecipe) {
    recipeModel.insertDocument(newRecipe, recipeModel);
},

exports.getOneRecipe = function(filter, projection, callback) {
    recipeModel.getOne(filter, projection, callback);
},

exports.getAllRecipes = function(filter, projection, callback) {
    recipeModel.getAll(filter, projection, callback);
}
