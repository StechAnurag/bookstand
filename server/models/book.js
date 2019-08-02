const mongoose = require('mongoose');

const Book = mongoose.model('Book', new mongoose.Schema({
  name: {
    type : String,
    required : true
  },
  genre: {
    type : String,
    required : true
  },
  authorId: {
    type : mongoose.Schema.Types.ObjectId,
    required : true
  }
}));

module.exports = Book;
