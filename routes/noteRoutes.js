const express = require("express");
const router = express.Router();
const notes = require("../controllers/notes");
const catchAsync = require("../utils/catchAsync");

router
  .route("/")
  .get(catchAsync(notes.index))
  .post(catchAsync(notes.createPost));

router.route("/create").get(catchAsync(notes.getCreateForm));

router
  .route("/:id")
  .get(catchAsync(notes.showNote))
  .delete(catchAsync(notes.deleteNote));

router
  .route("/:id/edit")
  .get(catchAsync(notes.getEditForm))
  .put(catchAsync(notes.editNote));

module.exports = router;
