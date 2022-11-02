var express = require("express");
var router = express.Router();

const todos = require("./todosController");

/* GET home page. */
router.put("/todo/:id", todos.update);
router.delete("/todo/:id", todos.delete);
router.get("/todo/:id", todos.show);
router.get("/todo", todos.index);
router.post("/todo/create", todos.create);

module.exports = router;
