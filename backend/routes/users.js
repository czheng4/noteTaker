const router = require("express").Router();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { createHash } = require("crypto");

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  salt: {
    type: Number,
    require: true,
  },
  theme: {
    type: String,
    default: "dark",
  },
});
const User = mongoose.model("noteTrackerUsers", userSchema);

router.route("/signup").post((req, res) => {
  /* store users infomation when signning up */
  const salt = Math.floor(Math.random() * 1000000);
  const hash = createHash("sha256");

  /* store the hash of salt + password for security reason */
  hash.update(salt + req.body.password);
  const password = hash.digest("hex");
  const new_user = new User({
    username: req.body.username,
    password: password,
    salt: salt,
    theme: req.body.theme,
  });
  new_user
    .save()
    .then(() => res.json("Add new user successfully"))
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/signin/:username/:password").get((req, res) => {
  User.findOne({ username: req.params.username })
    .then((user) => {
      if (user == null) return res.json("username and password does not match");
      console.log(user);
      const hash = createHash("sha256");
      hash.update(user.salt + req.params.password);
      const hash_value = hash.digest("hex");
      if (hash_value == user.password) {
        res.json(user);
      } else {
        res.json("username and password does not match");
      }
    })
    .catch((err) => res.status(400).json("Error " + err));
});

router.route("/").get((req, res) => {
  User.findOne()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json("Error " + err));
});

module.exports = router;
