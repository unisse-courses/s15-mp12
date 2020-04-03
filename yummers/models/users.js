//mongoose
const mongoose = require('mongoose');

const database = require('../database');

const userSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId , required: [true, 'No ID provided.'] },
    name: { type: String, required: [true, 'No Name provided.'] },
    joinDate: Date,
    password: { type: String, required: true},
    email: { type: String, required: true}
})

const userModel = mongoose.model('User', userSchema);

exports.getOne = function(filter, projection, callback) {
    database.findOne(userModel, filter, projection, callback);
}

exports.getAll = function(filter, projection, callback) {
    database.findMany(userModel, filter, projection, callback);
}
