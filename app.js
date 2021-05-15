const dotenv = require("dotenv"); // for securing data
const mongoose = require("mongoose");
const express = require("express");
const Customer = require("./model/customers");
const app = express();

dotenv.config({ path: "./config.env" });

// Connecting Database
require("./database/connection");

// Using Middleware to converting json files to object
app.use(express.json());

// Using Middleware to linking the router file
app.use(require("./router/auth"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Hello world from Server`);
  //   middleware();
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
