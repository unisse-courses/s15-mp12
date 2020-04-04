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
    formSwitch: function(type) {	//switch for login/signup tabs
        if (type == 0) return true;
        else return false;
    },
    getName: function(id) {

    },
    dateFormat: function(date) {
        return date.toLocaleString('default', {month: 'long'}) + " " + date.getDate() + ", " + date.getFullYear();
    }
}