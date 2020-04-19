//mongoose
const mongoose = require('mongoose');

const database = require('../database');

const cookbookSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId , required: [true, 'No ID provided.'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    recipe: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true},
    isCooked: Boolean
});

const cookbookModel = mongoose.model('Cookbook', cookbookSchema);

module.exports = {
    getOne: function(filter, projection, callback) {
        cookbookModel.findOne(filter, projection).populate('user').populate('recipe').exec(function (err, res) {
            if(err) throw err;
            callback(res.toObject());       
        });
    },
    getAll: function(filter, projection, callback) {
        cookbookModel.find(filter, projection).populate('user').populate('recipe').exec(function (err, res) {
            if(err) throw err;
            var modelObject = [];
    
            res.forEach(function(doc) {
                doc.recipe.user = doc.user;
                modelObject.push(doc.toObject());
            });

            console.log(modelObject);
            callback(modelObject);
        });
    },
    updateOne: function(filter, update, callback) {
        database.findAndUpdate(cookbookModel, filter, update, callback);
    }
}