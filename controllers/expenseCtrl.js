const path = require("path");
const rootDir = require("../util/rootDir");
const Expenses = require("../modals/expenses");

exports.getExpenseData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "expense.html"));
};

exports.getExpenses = (req, res, next) => {
  Expenses.findAll().then((expenses) => {
    res.json(expenses);
  });
};

exports.postExpenseData = (req, res, next) => {
  const { description, category, amount } = req.body;
  Expenses.create({
    description,
    category,
    amount
  })
    .then(() => {
      console.log(description, category, amount);
      res.redirect("/expense");
    })
    .catch((err) => {
      console.log(err);
    });
};
