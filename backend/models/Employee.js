const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  employeeId: {
    type: String,
    required: true,
    unique: true
  },

  company: {
    type: String,
    required: true
  },

  designation: {
    type: String,
    required: true
  },

  verified: {
    type: Boolean,
    default: false
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model('Employee', employeeSchema);