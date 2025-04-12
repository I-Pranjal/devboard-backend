const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  id: String,
  text: String,
  done: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Task', TaskSchema)
