//mongoose
const mongoose = require('mongoose');

const database = require('../database');

const userSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId , required: [true, 'No ID provided.'] },
    username: { type: String, required: true},
    name: { type: String, required: [true, 'No Name provided.'] },
    joinDate: Date,
    password: { type: String, required: true},
    email: { type: String, required: true},
    description: {type: String, required: [true, 'No description provided']}
})

const userModel = mongoose.model('User', userSchema);

exports.create = function(username, name, pass, email) {

    var user = new userModel({
        _id: mongoose.Types.ObjectId(),
        username: username,
		name: name,
		joinDate: new Date(),
		password: pass,
		email: email
    });

    return user;
}

exports.getOne = function(filter, projection, callback) {
    database.findOne(userModel, filter, projection, callback);
}

exports.getAll = function(filter, projection, callback) {
    database.findMany(userModel, filter, projection, callback);
}

exports.insertOne = function(newUser, callback) {
    database.insertDocument(newUser, callback)
}

exports.updateOne = function(filter, update, callback) {
    database.findAndUpdate(userModel, filter, update, callback);
}