const recipe = require('./recipes');

//for mongoose. Basic schema of user
const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    joinDate: Date,
    password: String,
    email: String,
    recipes: [recipeSchema] //array of recipe(schema)
})

module.exports = users;