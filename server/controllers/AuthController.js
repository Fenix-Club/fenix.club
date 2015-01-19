'use strict';

var User = require('../models/User');
var Token = require('../models/Token');

exports.auth = function(req, res) {
  console.log(req.body);
  console.log(req.params);
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    email: email,
    password: password,
    isActive: true
  }, function(err, user) {
    if(err || !user) {
      return res.status(401).json({});
    }
    var token = new Token({
      user: user
    });
    token.save(function(err, token) {
      if(err) {
        return res.status(401).json({});
      }
      token.populate('user', function(err, token) {
        if(err) {
          return res.status(401).json({});
        }
        req.session.token = token.token;
        res.json(token);
      });
    });
  });

};

exports.addUser = function(req, res) {
  var name = req.body.name;
  var surname = req.body.surname;
  var email = req.body.email;
  var password = req.body.password;

  var user = new User({
    name: name,
    surname: surname,
    email: email,
    password: password,
    isActive: true,
    role: 'admin'
  });
  user.save(function(err, user) {
    if(err) {
      return res.status(403).json({});
    }
    res.json(user);
  });

};

exports.me = function(req, res) {
  if(req.user) {
    return res.json(req.user);
  } else {
    return res.status(403).json({});
  }
};

exports.parseCookie = function(req, res, next) {
  var token_id = req.session.token;
  if(!token_id) {
    return next();
  }
  Token.findOne({
    token: token_id
  })
  .populate('user')
  .exec(function(err, token) {
    if(!err && token) {
      req.user = token.user;
    }
    next();
  });
};

exports.logout = function(req, res) {
  req.session = null;
  res.json({});
};