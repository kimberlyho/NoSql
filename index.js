var express = require('express');
var path= require('path');
var app = express();
var bodyParser = require('body-parser');


var MongoClient= require('mongodb').MongoClient;
const assert = require('assert');
var url = 'mongodb://localhost:27017';
var str="";

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.static(__dirname+'/views'));

app.get('/',function(req,res){
  res.render('mailbox');
});


app.route('/inbox').get(function(req,res){
  MongoClient.connect(url, function(err, client){
    var db = client.db('enron');
    var collection = db.collection('email')

    var cursor = collection.find({"folder":"inbox"});
    cursor.each(function(err,item){
      if(item!=null){
        str=str+"&nbsp;&nbsp;&nbsp;&nbsp;Email folder &nbsp;&nbsp;" + item.folder + item.text +"</br>"
      }
    });
    res.send(str);
  });
});


var server=app.listen(3000,function(){
  console.log("On server");
});
