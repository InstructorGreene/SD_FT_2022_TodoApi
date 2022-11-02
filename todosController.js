const createError = require("http-errors");
const { ObjectId } = require("mongodb");

const { Todo } = require("./models/todos");

// finds all todos
exports.index = async function (req, res) {
  // find everything that matches the provided criteria : find()
  let todos = await Todo.find();
  res.send(todos);
};

// creates a new todo
exports.create = async function (req, res, next) {
  // if no name included, throw err
  if (!req.body.name || !req.body.description) {
    return next(createError(400, "please fill out both fields"));
  }
  const todo = new Todo({
    name: req.body.name,
    description: req.body.description,
  });
  await todo.save();
  res.send(todo);
};

// find one todo by id
exports.show = async function (req, res, next) {
  let todo = await Todo.findOne({ _id: ObjectId(req.params.id) });
  if (todo) {
    return res.send(todo);
  }
  return next(createError(404, "no todo with that id"));
};

exports.delete = async function (req, res, next) {
  let status = await Todo.deleteOne({ _id: ObjectId(req.params.id) });
  if (status.deletedCount) {
    return res.send({ result: true });
  }
  return next(createError(404, "no todo with that id"));
};

exports.update = async function (req, res, next) {
  if (!req.body.name && !req.body.description) {
    return next(createError(400, "name and decsription is required"));
  }

  let updated = await Todo.findOne({ _id: ObjectId(req.params.id) });
  if (updated) {
    updated.name = req.body.name || updated.name;
    updated.description = req.body.description || updated.description;

    await updated.save();
    return res.send(updated);
  }
  return next(createError(404, "no todo with that id"));
  // });
};
