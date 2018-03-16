var MongoClient= require('mongodb').MongoClient;
const assert = require('assert');


//connection URL
const url = 'mongodb://localhost:27017';


MongoClient.connect(url, function(err, client){
  assert.equal(null,err);
  //console.log("connected succesfully to server", client);
  const db= client.db('enron');
  findDocuments1("rosalee.fleming@enron.com", db, function(){
    client.close();
  });
});


// renvoie les mails d'un folder specifique
const findDocuments = function(folder, db, callback){
  const collection = db.collection('email');
    collection.find({"folder":folder}).toArray(function(err,docs){
    assert.equal(err,null);
    console.log("Found docs");
    //console.log(docs);
    docs.forEach(function(doc){
      console.log(doc);
    });
    callback(docs);
  });
}


// renvoie les mails d'un sender specifique
const findDocuments1 = function(sender, db, callback){
  const collection = db.collection('email');
    collection.find({"sender":sender}).toArray(function(err,docs){
    assert.equal(err,null);
    console.log("Found docs");
    //console.log(docs);

    docs.forEach(function(doc){
      console.log(doc.text);
    });
      console.log(docs.length);
    callback(docs);

  });

}


//renvoie les mails d'un recipient specifique
const findDocuments2 = function(recipients, db, callback){
  const collection = db.collection('email');
    collection.find({"recipients":recipients}).toArray(function(err,docs){
    assert.equal(err,null);
    //console.log(docs);
    docs.forEach(function(doc){
      console.log(doc);
    });
    callback(docs);
  });
}


//renvoie le nombr de mails dans un folder
