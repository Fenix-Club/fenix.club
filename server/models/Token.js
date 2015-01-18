var mongoose = require('mongoose')
, Schema = mongoose.Schema;
var randomToken = require('random-token').create('dupa slonia'); // TODO: move salt to config file

var TokenSchema = new Schema({
  token: {
    type: String,
    deafult: function() {
      return randomToken(64);
    },
    index: {
      unique: true
    }
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

var Token = mongoose.model('Token', TokenSchema);

TokenSchema.pre('save', function(next) {
  this.token = randomToken(64);
  next();
});

module.exports = Token;