const cookbookModel = require('../models/cookbook');

exports.create = function(newRecipe) {
    cookbookModel.insertDocument(newRecipe, recipeModel);
},

exports.getOneRecipe = function(filter, projection, callback) {
    cookbookModel.getOne(filter, projection, callback);
},

exports.getAllRecipes = function(filter, projection, callback) {
    cookbookModel.getAll(filter, projection, callback);
}
