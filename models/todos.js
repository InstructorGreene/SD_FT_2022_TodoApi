const mongoose = require("mongoose");

// creates the schema obj to tell the db what our data to store will look like
const todoSchema = mongoose.Schema({
  // attach the names to the data types
  name: String,
  description: String,
});

// export the schema as a model
module.exports.Todo = mongoose.model("Todo", todoSchema);
