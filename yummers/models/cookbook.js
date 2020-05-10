//mongoose
const mongoose = require('mongoose');

const database = require('../database');

const cookbookSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId , required: [true, 'No ID provided.'] },
    userId: { type: String, required: true},
    recipeId: { type: String, required: true},
    isCooked: Boolean
});

const cookbookModel = mongoose.model('Cookbook', cookbookSchema);

module.exports = {
    getOne: function(filter, projection, callback) {
        database.findOne(cookbookModel, filter, projection, callback);
    },
    getAll: function(filter, projection, callback) {
        database.findMany(cookbookModel, filter, projection, callback);
    },
    updateOne: function(filter, update, callback) {
        database.findAndUpdate(cookbookModel, filter, update, callback);
    }
}