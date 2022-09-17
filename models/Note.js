const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    default: 'Happy😃',
    enum: ['Happy😃', 'Nervous😬', 'Anxious🥺', 'Sad😭'],
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Note', NoteSchema)
