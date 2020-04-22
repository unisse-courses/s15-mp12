//mongoose
const mongoose = require('mongoose');

const database = require('../database');

const commentSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, required: [true, 'No ID provided.'] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true},
    comment: {type: String, required: true},
    date: {type: Date}
});

const commentModel = mongoose.model('Comment', commentSchema);

exports.create = function(object){
    var comment = new commentModel({
        _id: object._id,
        user: object.user,
        recipe: object.recipe,
        comment: object.comment,
        date: new Date()
    });

    return comment;
}

exports.getComments = function(filter, projection, callback) {
    commentModel.find(filter, projection).populate('user').sort({date : -1}).exec(function(err, res) {
        if(err) throw err;
        var modelObject = [];

        res.forEach(function(doc) {
            modelObject.push(doc.toObject());
        });

        callback(modelObject);
    });
}

exports.insertOne = function(newComment, callback) {
    newComment.save(function(err, res) {
        if (err) throw err;
        res.populate('user', function(err, res) {
            if(err) throw err;

            callback(res);
        });
    });
}