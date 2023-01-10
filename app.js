const express = require("express");
const bodyParser = require("body-parser");

const signUpRouter = require("./routes/signUpRouter");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(signUpRouter);

app.listen(3000);
