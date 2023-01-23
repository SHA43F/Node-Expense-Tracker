const path = require("path");
const jwt = require("jsonwebtoken");
const rootDir = require("../util/rootDir");
const Expenses = require("../modals/expenses");
const FileDownloads = require("../modals/fileDownloads");

exports.getExpenseData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "expense.html"));
};

exports.getExpenses = async (req, res, next) => {
  const expenses = await Expenses.findAll({
    where: { userId: req.user.id }
  });
  const fileDownloads = await FileDownloads.findAll({
    where: { userId: req.user.id }
  });
  res.json({
    expenses: expenses,
    isPremiumUser: req.user.isPremiumUser,
    fileDownloads: fileDownloads
  });
};

exports.postExpenseData = (req, res, next) => {
  const { description, category, amount, token, incomeExpense } = req.body;
  const tokenData = jwt.verify(token, "secret-key");
  userId = tokenData.id;
  Expenses.create({
    description,
    category,
    amount,
    userId,
    incomeExpense
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
