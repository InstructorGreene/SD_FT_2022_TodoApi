require("dotenv").config();
const mongoose = require("mongoose");

const express = require("express");
const app = express();
const uri = process.env.MONGO_CONNECT_STRING;
const port = process.env.PORT;
const router = require("./router");

app.use(express.json());
app.use(router);

mongoose.connect(uri);
// express app(server) listening
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
// Databse has conencted successfully
db.once("open", () => {
  console.log("database Connected");
});
