const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/sqlDatabase");

const signUpRouter = require("./routes/signUpRouter");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(signUpRouter);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
