const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://robin1234:robin1234@badbank.07jaosl.mongodb.net/?retryWrites=true&w=majority';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client){
    console.log('Connected!')

    // database name
    const dbName = 'badbank';
    const db = client.db(dbName);

    // new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    // insert into customer table
    var collection = db.collection('customers');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function (err, result){
        console.log('Document insert');
    });

    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:', docs);
        });

        //clean up
        client.close();
});

