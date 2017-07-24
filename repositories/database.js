var MongoClient = require('mongodb').MongoClient;
var users = require('./users');
var messages = require('./messages');
var url = "mongodb://localhost:27017/mydb";

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
        this.collection = collection;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            let v = db.collection(this.collection).find({}, function(err, res) {
                if (err) throw err;
                callback( null, v );
                db.close();
            });
        });
    },

    findOne: function(collection, id, callback) {
        this.collection = collection;
        this.id = id;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(this.collection).findOne({
                "id": this.id
            }, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },

    add: function(collection, obj, callback) {
        this.collection = collection;
        this.obj = obj;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(this.collection).insertOne(obj, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },

    findOneAndDelete: function(collection, id, callback) {
        this.collection = collection;
        this.id = id;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(this.collection).findOneAndDelete({
                "id": this.id
            }, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    },

    findOneAndUpdate: function(collection, id, callback) {
        this.collection = collection;
        this.id = id;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection(this.collection).findOneAndUpdate({
                "id": this.id
            }, function(err, res) {
                if (err) throw err;
                db.close();
            });
        });
    }
}