const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const routes = require("./routes/TaskRoute");

const app = express();

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Log incoming requests
app.use((req, res, next) => {
  console.log(`Received a ${req.method} request to ${req.url}`);
  next();
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api", routes);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 80;
app.listen(port, () => console.log(`Listening at ${port}`));
