//mongoose
const mongoose = require('mongoose');

const database = require('../database');

const recipeSchema = new mongoose.Schema({
    name:  { type: String, required: [true, 'No Name provided.'] },
    _id: { type: mongoose.Schema.Types.ObjectId, required: [true, 'No ID provided.'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    date: Date,
    servings: String,
    ingredients: { type: [String], required: true},
    preparation: { type: [String], required: true},
    description: {type: String, required: [true, 'No description provided.']},
    cookTime: {type: String},
    prepTime: {type: String},
    recipePicture: {type: String, required: true},
    likes:{type:[mongoose.Schema.Types.ObjectId]}
});

const recipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = {
    create: function(name, recipeId, userId, servings, ingredients, preparation, cookTime, prepTime, picture) {
        var recipe = new recipeModel({
            name: name,
            _id: recipeId,
            user: userId,
            date: new Date(),
            servings: servings,
            ingredients: ingredients,
            preparation: preparation,
            description: 'New Recipe!',
            cookTime: cookTime,
            prepTime: prepTime,
            recipePicture: '/img/recipe_' + recipeId + '.' + picture,
            likes: []
        });

        return recipe;
    },
    getOne: function(filter, projection, callback) {
        recipeModel.findOne(filter, projection).populate('user').exec(function(err, res) {
            if(err) throw err;

            callback(res.toObject());
        });
    },
    getAll: function(filter, projection, callback) {
        recipeModel.find(filter, projection).populate('user').exec(function(err, res) {
            if(err) throw err;
            var modelObject = [];

            res.forEach(function(doc) {
                modelObject.push(doc.toObject());
            });

            callback(modelObject);
        });
    },
    insertOne: function(newRecipe, callback) {
        database.insertDocument(newRecipe, callback);
    },
    updateOne: function(filter, update, callback) {
        database.findAndUpdate(recipeModel, filter, update, callback);
    },
    deleteOne: function(filter, callback) {
        database.deleteDocument(recipeModel, filter, callback);
    }
}