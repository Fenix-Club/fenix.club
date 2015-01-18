var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: {
    type: String,
    index: {
      unique: true
    }
  },
  role: {
    type: String,
    enum: ['admin', 'member']
  },
  password: {
    type: String,
    select: false
  },
  isActive: Boolean
});

var User = mongoose.model('User', UserSchema);

module.exports = User;