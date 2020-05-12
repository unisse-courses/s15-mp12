//config
const {dbURL} = require('./config');

//database connection
const mongoose = require('mongoose');
const databaseURL = dbURL;
const options = {useNewUrlParser: true, useUnifiedTopology: true};
    
module.exports = {
    //connect to clouddb
    connect: function() {   
        mongoose.connect(databaseURL, options, function(err, res) {
            if(err) throw err;
        
            console.log('Database Connected to cloud');
        });
    },
    //CRUD Operations
    insertDocument: function(doc, callback) {
        doc.save(function(err, res) {
            if(err) throw err;

            if(res != null) callback(res);
        })
    },

    /**
     * model - model object to find
     * filter - Filter or specific queries
     * projection - Specify field to return(optional)
     * callback - doc found
    **/
    findOne: function(model, filter, projection, callback) {
        model.findOne(filter, projection, function(err, res) {
            if(err) throw err;
            
            if(res != null) callback(res.toObject());
            else callback(null);
        });
    },

    /**
     * model - model object to find
     * filter - Filter or specific queries
     * projection - Specify field to return(optional)
     * callback - doc found
    **/
   findMany: function(model, filter, projection, callback) {
        model.find(filter, projection, function(err, res) {
            if(err) throw err;
            var modelObject = [];

            res.forEach(function(doc) {
                modelObject.push(doc.toObject());
            });

            callback(modelObject);
        });
   },

   findAndUpdate: function(model, filter, update, callback) {
       model.findOneAndUpdate(filter, update, function(err, res) {
           if(err) throw err;

           if(res != null) callback(res);
           else callback(null);
       })
   },

   deleteDocument: function(model, filter, callback) {
        model.deleteOne(filter, function(err, res) {
            if(err) throw err;

            callback(res);
       });
   }

}
