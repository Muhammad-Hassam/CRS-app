const mongoose = require('mongoose');

var ApplyjobsSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  cv: {
    type: String,
    required: true,
  },
  jobID: {
    type: Object,
    required: true,
  },
  userID:{
    type: String,
  }
});

var ApplyJobs = mongoose.model('Jobapply', ApplyjobsSchema);
module.exports = ApplyJobs;
