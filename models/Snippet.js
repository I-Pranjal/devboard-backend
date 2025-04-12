const mongoose = require('mongoose');


const SnippetSchema = new mongoose.Schema({
    title: String,
    description: String,
    language: String,
    snippet: String,
    tags: [String],
    favorite: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Snippet', SnippetSchema);
  