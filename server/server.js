var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


app.use(express.static(__dirname + '/../build'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb://localhost/fenixclub');


// Routings
app.use('/api/auth', require('./routings/auth'));

var server = app.listen(3001, function() {
  console.log('Listening on port %d', server.address().port);
});
