const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const { connect } = require('http2');

// Connection URL 
const url = 'mongodb://localhost:27017'

// Database Name 
const dbName = 'fruitsDB'

// Create a new MongoClient 
const client = new MongoClient(url, { useNewUrlParser: true });

// use connect method to connect to the Server 
client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected succesfully to server");

    const db = client.db(dbName)

    insertDocuments(db, function(){
        client.close()
    })
})

const insertDocuments = function(db, callback){
    // get the document 
    const collection = db.collection('fruits');
    // insert some document 
    collection.insertMany([
        {
            name: "Apple",
            score: 8,
            review: "Great fruit"
        }, 
        {
            name: "Orange",
            score: 6,
            review: "Kinda sour"
        }, 
        {
            name: "Banana",
            score: 9,
            review: "Great stuff!"
        }
    ], function(err, result){
        assert.equal(err, null)
        // assert.equal(3, result.result.n)
        // assert.equal(3, result.ops.length)
        console.log("Inserted 3 documents into the collection");
        callback(result);
    })
}