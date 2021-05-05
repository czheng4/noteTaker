const router = require("express").Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* user schema */
const noteSchema = new Schema({
  userid: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
    trim: true,
  },
  text: {
    type: String,
    trim: true,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});
const Note = mongoose.model("noteTakerNotes", noteSchema);

router.route("/create").post((req, res) => {
  const new_note = new Note({
    userid: req.body.userid,
    text: req.body.text,
    title: req.body.title,
    category: req.body.category,
  });
  new_note
    .save()
    .then(() => res.json(new_note))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/:userid").get((req, res) => {
  Note.find({ userid: req.params.userid })
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
