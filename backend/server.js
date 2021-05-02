const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.once("open", () => {
  console.log("Connect to mongoose");
});

const exerciseRouter = require("./routes/exercise");
const userRouter = require("./routes/user");

app.use("/exercise", exerciseRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
