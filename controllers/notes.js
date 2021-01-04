const Note = require("../models/note");

module.exports.index = async (req, res) => {
  const notes = await Note.find({});
  res.render("index", { notes });
};

module.exports.createPost = async (req, res) => {
  const { title, text } = req.body;
  const time = new Date().getTime();
  const creationDate = new Date(time);
  const note = new Note({ title, text, creationDate });
  await note.save();
  res.redirect(`/notes`);
};

module.exports.getCreateForm = (req, res) => {
  res.render("create.ejs");
};

module.exports.showNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.render("show", { note });
};

module.exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByIdAndDelete(id);
  res.redirect("/notes");
};

module.exports.getEditForm = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  res.render("edit", { note });
};

module.exports.editNote = async (req, res) => {
  const { id } = req.params;
  const note = await Note.findByIdAndUpdate(id, { ...req.body });
  const time = new Date().getTime();
  const creationDate = new Date(time);
  note.creationDate = creationDate;
  note.save();
  res.redirect(`/notes/${note._id}`);
};
