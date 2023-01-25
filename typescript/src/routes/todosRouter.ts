import { Router } from "express";
import { Todo } from "../models/models";

const router = Router();

type RequestBody = { text: string };

type RequestParams = { todoId: string };

let todos: Todo[] = [];

router.get("/", (req, res, next) => {
  res.status(200).json({ todos: todos });
});

router.post("/todo", (req, res, next) => {
  const body = req.body as RequestBody;
  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text
  };
  todos.push(newTodo);
  res
    .status(200)
    .json({ message: "Successfully Added Todo", todo: newTodo, todos: todos });
});

router.put("/todo/:todoId", (req, res, next) => {
  const params = req.params as RequestParams;
  const body = req.body as RequestBody;
  const todoId = params.todoId;
  const todoItemIndex = todos.findIndex((todoItems) => todoItems.id === todoId);
  if (todoItemIndex >= 0) {
    todos[todoItemIndex] = { id: todos[todoItemIndex].id, text: body.text };
    return res.status(200).json({ message: "Successufl", todos: todos });
  }
  res.status(404).json({ message: "Todo isn't found for this id" });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const todoId = req.params.todoId;
  todos = todos.filter((todoItems) => todoItems.id !== todoId);

  res.status(404).json({ message: "Deleted Todo", todos: todos });
});

export default router;
