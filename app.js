var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

const uri = "mongodb://roger:thebest1@ds133533.mlab.com:33533/ecom";
mongoose.connect(uri,{ useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
  console.log("Connection succeeded.");
});

app.use(bodyparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


app.use(cors());
app.options('*', cors())

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  next();
});

app.use(express.static(path.join(__dirname, './dist/Admin-Panel')));
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,"./dist/Admin-Panel/index.html"));
});

 app.use('',require('./routes/requests'));

module.exports = app;
