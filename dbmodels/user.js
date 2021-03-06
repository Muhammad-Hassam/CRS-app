const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  uname: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  cgpa: {
    type: String,
  },
  skills: {
    type: String,
  },
  intergrade: {
    type: String,
  },
  matricgrade: {
    type: String,
  },
  imageURL: {
    type: String,
  },
  role: {
    type: String,
  },
  status: {
    type: String,
  },
  services: {
    type: String,
  },
  website: {
    type: String,
  },
  contact: {
    type: String,
  },
  qualification: {
    type: String,
  },
  specialization: {
    type: String,
  },
  allow: {
    type: String,
  },
});

UserSchema.pre('save', async function (next) {
  if (this.isModified) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

var Student = mongoose.model('User', UserSchema);
module.exports = Student;
