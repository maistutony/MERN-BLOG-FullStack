const express = require("express");
const mongoose = require("mongoose");
const app = express();
const usersRoutes = require("./routes/usersRoutes");
const postsRoutes = require("./routes/posts"); // Corrected import name
require("dotenv").config();
const cors = require("cors");

// Connecting to the database
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.URL_STRING, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

// Middlewares
app.use(cors());
app.use(express.json());

// Router middlewares
app.use("/", usersRoutes);
app.use("/", postsRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
