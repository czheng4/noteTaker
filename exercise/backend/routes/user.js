const router = require("express").Router();
let User = require("../models/user");

router.route("/").get((req, res) => {
  console.log("here");
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const new_user = new User({ username });
  console.log(new_user);
  new_user
    .save()
    .then(() => res.json("Add user " + req.body.username))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
