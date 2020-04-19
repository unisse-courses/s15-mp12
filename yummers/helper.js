const mongoose = require('mongoose');
const userController = require('./controller/userController');
const recipeController = require('./controller/recipeController');

module.exports = {
    idToString: function(id) {	//Converts Mongoose ObjectId type to String. Used for URL/route concatenations
        return mongoose.Types.ObjectId(id).toString();
    },
    recipeImg: function(recipe) {	//recipe image at recipe page
        return '<img class="recipe-img col-lg-12" src="/img/recipe_' + recipe._id + '.jpg" alt="' + recipe.name + '"></img>';
    },
    postImg: function(recipe) {	//recipe image in a post
        return '<p class="col-lg-12"><img src="/img/recipe_' + recipe._id + '.jpg" alt="' + recipe.name + '"></img></p>'
    },
    recipeEditImg: function(recipe) {   //recipe image at edit recipe
        return '<img src="/img/recipe_'+ mongoose.Types.ObjectId(recipe._id).toString() + '.jpg" id = "foodImg" class="img-thumbnail h-50" alt="' + recipe.name + '"></img>'
    },
    dateFormat: function(date) {
        return date.toLocaleString('default', {month: 'long'}) + " " + date.getDate() + ", " + date.getFullYear();
    },
    ingredientNum: function(ingredient) {
        var string = ingredient.substr(0, ingredient.indexOf(' '));
        if(string.includes('/')) {
            var div = string.split('/');
            return div[1]/div[0];
        }
        return string;

    },
    ingredientText: function(ingredient) {
        return ingredient.substr(ingredient.indexOf(' '), ingredient.length);
    },
    checkUser: function(sessionUser, userpage) {
        return sessionUser == userpage;
    } 
}