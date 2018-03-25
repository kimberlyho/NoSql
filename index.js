var express = require('express');
var path= require('path');
var app = express();
var bodyParser = require('body-parser');


var MongoClient= require('mongodb').MongoClient;
const assert = require('assert');
var url = 'mongodb://localhost:27017';
var str="";
var db;
var collection;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(__dirname+'/views'));

app.get('/',function(req,res){
  res.render('mailbox');
});



app.route('*').get(function(req,res) {
    var folder = req.url.split("/");
    collection.find({"folder":folder[1]}).toArray(function(err,emails){
    assert.equal(err,null);
    res.render('content', {
        emails: emails,
     });
});
});







MongoClient.connect(url, function(err, client) {
  db = client.db('enron');
  collection = db.collection('email')
  var server = app.listen(3000,function(){
  console.log("On server");
  });
});
