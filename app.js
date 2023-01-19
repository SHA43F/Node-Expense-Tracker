const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/sqlDatabase");
const cors = require("cors");

const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const expenseRouter = require("./routes/expenseRouter");
const purchaseRouter = require("./routes/purchaseRouter");
const forgotPasswordRouter = require("./routes/forgotPasswordRouter");

const Users = require("./modals/users");
const Expenses = require("./modals/expenses");
const Orders = require("./modals/orders");
const forgotPassword = require("./modals/forgotPassword");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(signUpRouter);
app.use(signInRouter);
app.use(expenseRouter);
app.use(purchaseRouter);
app.use(forgotPasswordRouter);

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Users.hasMany(Orders);
Orders.belongsTo(Users);

Users.hasMany(forgotPassword);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
