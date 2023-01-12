const path = require("path");
const jwt = require("jsonwebtoken");
const rootDir = require("../util/rootDir");
const Expenses = require("../modals/expenses");

exports.getExpenseData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "expense.html"));
};

exports.getExpenses = (req, res, next) => {
  Expenses.findAll({ where: { userId: req.userId } }).then((expenses) => {
    res.json(expenses);
  });
};

exports.postExpenseData = (req, res, next) => {
  const { description, category, amount, token } = req.body;
  const tokenData = jwt.verify(token, "secret-key");
  console.log("styjutrwewdsvxb", tokenData.id);
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
  console.log(req.body.tokenId);
  const tokendata = jwt.verify(req.body.tokenId, "secret-key");
  console.log(tokendata);
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

exports.retrieveUserId = (req, res, next) => {
  try {
    const token = req.header("Auth");
    const tokenData = jwt.verify(token, "secret-key");
    req.userId = tokenData.id;
    next();
  } catch (err) {
    console.log(err);
  }
};
