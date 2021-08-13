const mongoose = require('mongoose');

var JobsSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  uname: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  skills: {
    type: String,
    require: true,
  },
  website: {
    type: String,
    require: true,
  },
  experience: {
    type: String,
    require: true,
  },
  contact: {
    type: String,
    require: true,
  },
  jobtype: {
    type: String,
    require: true,
  },
  id: {
    type: String,
    require: true,
  },
});

var Jobs = mongoose.model('Job', JobsSchema);
module.exports = Jobs;
