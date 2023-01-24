const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/sqlDatabase");
const cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
// const fs = require("fs");
// const path = require("path");

const signUpRouter = require("./routes/signUpRouter");
const signInRouter = require("./routes/signInRouter");
const expenseRouter = require("./routes/expenseRouter");
const purchaseRouter = require("./routes/purchaseRouter");
const forgotPasswordRouter = require("./routes/forgotPasswordRouter");
const premiumFeatureRouter = require("./routes/premiumFeatureRouter");

const Users = require("./modals/users");
const Expenses = require("./modals/expenses");
const Orders = require("./modals/orders");
const forgotPassword = require("./modals/forgotPassword");
const FileDownloads = require("./modals/fileDownloads");

const app = express();
app.use(cors());
// app.use(helmet());

// const loggingInfo = fs.createWriteStream(
//   path.join(__dirname, "loggingInfo.log"),
//   {
//     flags: "a"
//   }
// );

// app.use(morgan("combined", { stream: loggingInfo }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.use(signUpRouter);
app.use(signInRouter);
app.use(expenseRouter);
app.use(purchaseRouter);
app.use(forgotPasswordRouter);
app.use(premiumFeatureRouter);

console.log("Jenkins Check");

Users.hasMany(Expenses);
Expenses.belongsTo(Users);

Users.hasMany(Orders);
Orders.belongsTo(Users);

Users.hasMany(FileDownloads);

Users.hasMany(forgotPassword);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err) => {
    console.log(err);
  });
