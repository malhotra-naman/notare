const mongoose = require("mongoose");
const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: String,
  text: String,
  creationDate: Date,
});

module.exports = new mongoose.model("Note", NoteSchema);
