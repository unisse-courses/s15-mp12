//mongoose
const mongoose = require('mongoose');

const database = require('../database');

const recipeSchema = new mongoose.Schema({
    name:  { type: String, required: [true, 'No Name provided.'] },
    _id: { type: mongoose.Schema.Types.ObjectId , required: [true, 'No ID provided.'] },
    userId: { type: String, required: true},
    date: Date,
    servings: String,
    source: String,
    ingredients: { type: [String], required: true},
    preparation: { type: [String], required: true}

});

const recipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = {
    create: function(name, userId, servings, source, ingredients, preparation) {
        var recipe = new recipeModel({
            name: name,
            _id: mongoose.Types.ObjectId(),
            userId: userId,
            date: new Date(),
            servings: servings,
            source: source,
            ingredients: ingredients,
            preparation: preparation
        });

        return recipe;
    },
    getOne: function(filter, projection, callback) {
        database.findOne(recipeModel, filter, projection, callback);
    },
    getAll: function(filter, projection, callback) {
        database.findMany(recipeModel, filter, projection, callback);
    },
    insertOne: function(newRecipe, callback) {
        database.insertDocument(newRecipe, callback);
    },
    updateOne: function(filter, update, callback) {
        database.findAndUpdate(recipeModel, filter, update, callback);
    }
}