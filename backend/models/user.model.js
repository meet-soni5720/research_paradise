const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
  email : {
    type: String,
    required: true,
    unique: true,
    // trim: true,
    minlength: 1
  },

  name : {
    type: String,
    required: true,
  },

  password : {
    type: String,
    required: true,
    minlength: 3
  },

  googleScholar : {
    type: String,
  },

  github : {
    type: String,
  },

  additionalLinks : {
    type: String,
  },

  isProfessor : {
    type: Boolean,
    required: true,
  }

}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;