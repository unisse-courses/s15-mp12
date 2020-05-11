const mongoose = require('mongoose');
const userController = require('./controller/userController');
const recipeController = require('./controller/recipeController');

module.exports = {
    idToString: function(id) {	//Converts Mongoose ObjectId type to String. Used for URL/route concatenations
        return mongoose.Types.ObjectId(id).toString();
    },
    recipeImg: function(recipe) {	//recipe image at recipe page
        return '<img class="recipe-img col-lg-12" src="' + recipe.recipePicture + '" alt="' + recipe.name + '"></img>';
    },
    postImg: function(recipe) {	//recipe image in a post
        return '<img class="col-lg-12" src="' + recipe.recipePicture + '" alt="' + recipe.name + '"></img>'
    },
    recipeEditImg: function(recipe) {   //recipe image at edit recipe
        return '<img src="' + recipe.recipePicture + '" id = "foodImg" class="img-thumbnail h-50" alt="' + recipe.name + '"></img>'
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
    },
    generateRecipeId: function() {
        return mongoose.Types.ObjectId();
    },
    following: function(user, follow) {
        //if user is not following 'user follow'
        if(!user.follows.includes(follow.toString())) {
            return true;
        }
        else false;
    },
    checkCookbook: function(recipe, cookbook) { 
        var recipes = cookbook.map(item => {
            return item.recipe._id.toString();
        });
        return recipes.includes(recipe._id.toString());
    },
    checkLikers: function(recipe, user){
        if(!recipe.likes.map(like => like.toString()).includes(user._id)){
            return true;
        }
        else false;
    } 
}