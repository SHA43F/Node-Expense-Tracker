const path = require("path");
const jwt = require("jsonwebtoken");
const rootDir = require("../util/rootDir");
const Users = require("../modals/users");
const Expenses = require("../modals/expenses");
const sequelize = require("../database/sqlDatabase");
exports.getExpenseData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "expense.html"));
};

exports.getExpenses = (req, res, next) => {
  Expenses.findAll({ where: { userId: req.user.id } }).then((expenses) => {
    res.json({ expenses: expenses, isPremiumUser: req.user.isPremiumUser });
  });
};

exports.postExpenseData = (req, res, next) => {
  const { description, category, amount, token } = req.body;
  const tokenData = jwt.verify(token, "secret-key");
  userId = tokenData.id;
  Expenses.create({
    description,
    category,
    amount,
    userId
  })
    .then(() => {
      res.redirect("/expense");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteExpenseItem = (req, res, next) => {
  const expenseId = req.body.expenseId;
  const tokendata = jwt.verify(req.body.tokenId, "secret-key");
  Expenses.findByPk(expenseId)
    .then((expense) => {
      return expense.destroy({ where: { userId: tokendata.id } });
    })
    .then(() => {
      res.redirect("/expense");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getLeaderboard = async (req, res, data) => {
  const leaderboard = await Users.findAll({
    attributes: [
      "id",
      "userName",
      [sequelize.fn("sum", sequelize.col("expenses.amount")), "totalAmount"]
    ],
    include: [{ model: Expenses, attributes: [] }],
    group: ["users.id"],
    order: [["totalAmount", "DESC"]]
  });
  res.json(leaderboard);
};
