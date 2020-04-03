const mongoose = require('mongoose');
const userModel = require('../models/users');
const recipeController = require('../controller/recipeController');

exports.create = function(newUser) {
    userModel.insertDocument(newUser, userModel);
}

exports.getOne = function(filter, projection, callback) {
    userModel.getOne(filter, projection, callback);
}

exports.getAllUsers = function(filter, projection, callback) {
    userModel.getAll(filter, projection, callback);
}
