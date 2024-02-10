const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const userSchema = new Schema({
  professorId: {
    type: String,
    required : true,
  },

  title : {
    type: String,
    required: true,
    unique: true,
  },

  description : {
    type: String,
    required: true,
  },

  teamMembers : {
    type: String,
  },

  isHiring : {
    type: Boolean,
    required: true
  },

  projectLink : {
    type: String,
  },

  requiredSkills : {
    type: String,
  }, 
}, {
  timestamps: true
});



const User = mongoose.model('User', userSchema);

module.exports = User;