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
app.use(bodyParser.urlencoded({encoded : false}));
app.get('/',function(req,res){
  res.render('mailbox');
});

app.route('/inbox').get(function(req,res) {
    var folder = req.url.split("/");
    collection.find({"folder":folder[1]}).toArray(function(err,emails){
    assert.equal(err,null);
    res.render('content_inbox', {
        emails: emails,
     });
   });
});

app.route('/_sent').get(function(req,res) {
    var folder = req.url.split("/");
    collection.find({"folder":folder[1]}).toArray(function(err,emails){
    assert.equal(err,null);
    res.render('content_sent', {
        emails: emails,
     });
   });
});


app.route('/sent_items').get(function(req,res) {
    var folder = req.url.split("/");
    collection.find({"folder":folder[1]}).toArray(function(err,emails){
    assert.equal(err,null);
    res.render('content_sentitems', {
        emails: emails,
     });
   });
});

app.route('/business').get(function(req,res) {
    var folder = req.url.split("/");
    collection.find({"folder":folder[1]}).toArray(function(err,emails){
    assert.equal(err,null);
    res.render('content_business', {
        emails: emails,
     });
   });
});


app.route('/deleted_items').get(function(req,res) {
    var folder = req.url.split("/");
    collection.find({"folder":folder[1]}).toArray(function(err,emails){
    assert.equal(err,null);
    res.render('content_delete', {
        emails: emails,
     });
   });
});

app.route('/search').post(function(req,res) {
    var keyword = req.body.search_word;
    var folder = req.body.typebox;
    console.log(folder);
    console.log("keyword: "+keyword);
    var query = { $text : { $search: keyword }, "folder":folder } ;
    collection.find(query).toArray(function(err,emails){
    assert.equal(err,null);
    res.render('content', {
        emails: emails,
     });
   });
});

app.route('/form').get(function(req,res) {
  res.render('form');
});

app.route('/formresults').post(function(req,res) {
    var sender = req.body.search_sender;
    var recipients = req.body.search_recipients;
    var subject = req.body.search_subject;
    query = {"sender": sender, "recipients":recipients, "subject":subject}
    collection.find(query).toArray(function(err,emails){
    assert.equal(err,null);
    res.render('results_form', {
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
