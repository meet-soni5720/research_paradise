const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User schema
const hiringFormSchema = new Schema({
  researchPostId : {
    type: String,
    required: true,
  },

  userId : {
    type: String,
    required: true,
  },

  userName : {
    type : String,
    required: true,
  },

  email : {
    type : String,
    required: true,
  },

  relevantSkills :{
    type: String,
    required : true
  },
  
  researchStatement : {
    type: String,
    required: true
  },

}, {
  timestamps: true
});

const hiringForm = mongoose.model('hiringForm', hiringFormSchema);

module.exports = hiringForm;