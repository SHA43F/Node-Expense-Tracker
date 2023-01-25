"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get("/", (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post("/todo", (req, res, next) => {
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res
        .status(200)
        .json({ message: "Successfully Added Todo", todo: newTodo, todos: todos });
});
router.put("/todo/:todoId", (req, res, next) => {
    const todoId = req.params.todoId;
    const todoItemIndex = todos.findIndex((todoItems) => todoItems.id === todoId);
    if (todoItemIndex >= 0) {
        todos[todoItemIndex] = { id: todos[todoItemIndex].id, text: req.body.text };
        return res.status(200).json({ message: "Successufl", todos: todos });
    }
    res.status(404).json({ message: "Todo isn't found for this id" });
});
router.delete("/todo/:todoId", (req, res, next) => {
    const todoId = req.params.todoId;
    todos = todos.filter((todoItems) => todoItems.id !== todoId);
    res.status(404).json({ message: "Deleted Todo", todos: todos });
});
exports.default = router;
