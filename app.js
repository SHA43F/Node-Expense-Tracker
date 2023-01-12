const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/sqlDatabase");
const cors = require("cors");

const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const expenseRouter = require("./routes/expenseRouter");

const Users = require("./modals/users");
const Expenses = require("./modals/expenses");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(signUpRouter);
app.use(signInRouter);
app.use(expenseRouter);

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
