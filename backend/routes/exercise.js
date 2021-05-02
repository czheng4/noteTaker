const router = require("express").Router();
let Exercise = require("../models/exercise");
const { route } = require("./user");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  console.log(req.body);
  const new_exercise = new Exercise({
    username: req.body.username,
    description: req.body.description,
    duration: Number(req.body.duration),
    date: Date.parse(req.body.date),
  });

  new_exercise
    .save()
    .then(() => res.json("Add new exercise "))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Delete successully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id)
    .then((e) => {
      e.username = req.body.username;
      e.description = req.body.description;
      e.duration = Number(req.body.duration);
      e.parsedate = Date.parse(req.body.date);
      e.save()
        .then(() => res.json("Update successfully"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
