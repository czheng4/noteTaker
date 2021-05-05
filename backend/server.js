const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.once("open", () => {
  console.log("Connect to mongoose");
});

const usersRouter = require("./routes/users");
app.use("/server/users", usersRouter);

const notesRouter = require("./routes/notes");
app.use("/server/notes", notesRouter);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`Note Tracker server is running on port ${port}`);
});
