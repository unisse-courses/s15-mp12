//mongodb - used for initial run to create collection user and recipe
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
 const databaseURLDB = "mongodb://localhost:27017/";
const dbname =  "yummersdb";

//mongoose
const mongoose = require('mongoose');
const databaseURL = 'mongodb://localhost:27017/yummersdb';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

module.exports = {
    //create users collection to mongodb
    createUserCollection: function() {
        mongoClient.connect(databaseURLDB, function(err, db) {
        if(err) throw err;
        const dbo = db.db(dbname);

            dbo.createCollection('users', function(err, res) {
                if(err) throw err;
                console.log('Users collection created!');
                db.close();
            });
        });
    },

    //create recipes collection to mongodb
    createRecipeCollection: function() {
        mongoClient.connect(databaseURLDB, function(err, db) {
        if(err) throw err;
        const dbo = db.db(dbname);

            dbo.createCollection('recipes', function(err, res) {
                if(err) throw err;
                console.log('recipes collection created!');
                db.close();
            });
        });
    },
    
    connect : function() {
        mongoose.connect(databaseURL, options, function(err, res) {
            if(err) throw err;
            console.log('Database Connected to : ' + databaseURL);
        })
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
   }

}
