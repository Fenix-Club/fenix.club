var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var fs = require('fs');

app.use(express.static(__dirname + '/build'));
app.use(cookieParser());

var server = app.listen(3001, function() {
  console.log('Listening on port %d', server.address().port);
});
