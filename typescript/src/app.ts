import express from "express";
import bodyParser from "body-parser";
import todosRouter from "./routes/todosRouter";

const app = express();

app.use(bodyParser.json());

app.use(todosRouter);

app.listen(3000);
