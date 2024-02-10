const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const researchPostSchema = new Schema({
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



const researchPosts = mongoose.model('researchPost', researchPostSchema);

module.exports = researchPosts;