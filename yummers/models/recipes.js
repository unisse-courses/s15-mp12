//mongoose
const mongoose = require('mongoose');

const database = require('../database');

const recipeSchema = new mongoose.Schema({
    name:  { type: String, required: [true, 'No Name provided.'] },
    id: { type: mongoose.Schema.Types.ObjectId , required: [true, 'No ID provided.'] },
    userId: { type: String, required: true},
    date: Date,
    servings: String,
    source: String,
    ingredients: { type: [String], required: true},
    preparation: { type: [String], required: true}

});

const recipeModel = mongoose.model('Recipe', recipeSchema);

module.exports = {
    getOne: function(filter, projection, callback) {
        database.findOne(recipeModel, filter, projection, callback);
    },
    getAll: function(filter, projection, callback) {
        database.findMany(recipeModel, filter, projection, callback);
    }
}