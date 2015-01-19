var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var fs = require('fs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('cookie-session');

app.set('trust proxy', 1); // trust first proxy

app.use(express.static(__dirname + '/../build'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({keys: ['1234567890QWERTY', 'dupa slonia'] })); // TODO: sign cookies


mongoose.connect('mongodb://localhost/fenixclub');

// Controllers
var AuthController = require('./controllers/AuthController');

app.use('/api/*', AuthController.parseCookie);
// Routings
app.use('/api/auth', require('./routings/auth'));
var server = app.listen(3001, function() {
  console.log('Listening on port %d', server.address().port);
});
