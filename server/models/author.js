const mongoose = require('mongoose');

const Author = mongoose.model('Author', new mongoose.Schema({
  name: {
    type : String,
    required : true
  },
  age: {
    type : Number,
    required : true
  }
}));

module.exports = Author;
