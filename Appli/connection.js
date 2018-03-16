var MongoClient= require('mongodb').MongoClient;
const assert = require('assert');


//connection URL
const url = 'mongodb://localhost:27017';


MongoClient.connect(url, function(err, client){
  assert.equal(null,err);
  //console.log("connected succesfully to server", client);
  const db= client.db('enron');
  findDocuments("_sent", db, function(){
    client.close();
  });
});


const findDocuments = function(folder, db, callback){
  const collection = db.collection('email');
    collection.find({"folder":folder}).toArray(function(err,docs){
    assert.equal(err,null);
    console.log("Found docs");
    //console.log(docs);
    docs.forEach(function(doc){
      console.log(doc.folder);
    });
    callback(docs);
  });
}

const findDocuments = function(sender, db, callback){
  const collection = db.collection('email');
    collection.find({"sender":sender}).toArray(function(err,docs){
    assert.equal(err,null);
    console.log("Found docs");
    //console.log(docs);
    docs.forEach(function(doc){
      console.log(doc.folder);
    });
    callback(docs);
  });
}

const findDocuments = function(reciepients, db, callback){
  const collection = db.collection('email');
    collection.find({"reciepients":reciepients}).toArray(function(err,docs){
    assert.equal(err,null);
    console.log("Found docs");
    //console.log(docs);
    docs.forEach(function(doc){
      console.log(doc.folder);
    });
    callback(docs);
  });
}
