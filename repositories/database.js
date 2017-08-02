var MongoClient = require('mongodb').MongoClient;
var users = require('./users');
var messages = require('./messages');
var url = "mongodb://localhost:27017/philipp";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("users").insertMany(users, function(err, res) {
        if (err) throw err;
    });
    db.collection("messages").insertMany(messages, function(err, res) {
        if (err) throw err;
    });
    console.log('Gotcha!');
});

module.exports = {

    findAll: function(collection, callback) {

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(collection).find({}).toArray(function(err, res) {
                callback(err, res);
                db.close();
            });
        });
    },

    findOne: function(collection, id, callback) {
        
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(collection).findOne({
                "id": id
            }, function(err, res) {
                callback(err, res);
                db.close();
            });
        });
    },

    add: function(collection, obj, callback) {
        this.obj = obj;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(collection).insertOne(obj, function(err, res) {
                callback(err, res);
                db.close();
            });
        });
    },

    findOneAndDelete: function(collection, id, callback) {
        this.id = id;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(collection).findOneAndDelete({
                "id": this.id
            }, function(err, res) {
                callback(err, res);
                db.close();
            });
        });
    },

    findOneAndUpdate: function(collection, id, callback) {
        this.id = id;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(collection).findOneAndUpdate({
                "id": this.id
            }, function(err, res) {
                callback(err, res);
                db.close();
            });
        });
    }
}