const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  body: {
    type: String,
    required: true
  }
})

var Note = mongoose.model('Note', NoteSchema);
module.exports = Note;