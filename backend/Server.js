const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes/TaskRoute");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use("/api", routes);

app.listen(PORT, () => console.log(`Listening at ${PORT}`));
