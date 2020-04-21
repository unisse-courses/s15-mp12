const mongoose = require('mongoose');
const commentModel = require('../models/comments');
const recipeModel = require('../models/recipes');

exports.addComment = function(req, res) {
    var data = {
        _id: mongoose.Types.ObjectId(),
        user:  req.session.user,
        recipe: req.params.recipeId,
        comment: req.body.comment
    };
    
    var comment = commentModel.create(data);
    commentModel.insertOne(comment, function(dbres) {
        res.send(dbres);
    }); 
}