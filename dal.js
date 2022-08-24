require('dotenv').config();
const MongoClient = require("mongodb").MongoClient;
const url = process.env.MONGODB_URI;
const dbName = "badbank"
let db = new MongoClient(url);

// connect to mongo
MongoClient.connect(url, { useNewUrlParser:true, useUnifiedTopology: true}, function(err, client) {
    console.log("Connected succesfully to db server", err);

    // connect to myproject database
    db = client.db(dbName);
});

// create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

function find(email) {
    return new Promise((resolve, reject) => {
        db
            .collection("users")
            .find({email: email})
            .toArray(function (err, docs){
                err ? reject(err) : resolve(docs);
            });
    });
}

function findOne(email) {
    return new Promise((resolve, reject) => {
        db
            .collection("users")
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
}

function update(email, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection("users")
            .findOneAndUpdate(
                {email: email},
                {$inc: {balance: amount}},
                {returnOriginal: false},
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );
    });
}

// all users
function all() {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

module.exports = {create, findOne, find, update, all};