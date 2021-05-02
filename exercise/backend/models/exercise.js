const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    description: { type: String, require: true },
    duration: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;
