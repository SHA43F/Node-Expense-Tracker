const path = require("path");
const jwt = require("jsonwebtoken");
const rootDir = require("../util/rootDir");
const Users = require("../modals/users");
const Expenses = require("../modals/expenses");

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
  const users = await Users.findAll();
  const userExpense = await users.map(async (user) => {
    const expenses = await Expenses.findAll({ where: { userId: user.id } });
    const expensesArray = await expenses.map((exp) => {
      return exp.amount;
    });
    const totalExpenses = expensesArray.reduce((exp, current) => {
      return exp + current;
    }, 0);
    return { userName: user.userName, totalExpense: totalExpenses };
  });
  const leaderboard = await Promise.all(userExpense);
  res.json(leaderboard);
  // Users.findAll().then((users) => {
  //   users.map((user) => {
  //     Expenses.findAll({ where: { userId: user.id } }).then((expenses) => {
  //       const expensesArray = expenses.map(async (exp) => {
  //         return exp.amount;
  //       });
  //       const totalExpenses = expensesArray.reduce((exp, current) => {
  //         return exp + current;
  //       }, 0);
  //       leaderboard.push({
  //         userName: user.userName,
  //         totalExpenses: totalExpenses
  //       });
  //     });
  //   });
  //   console.log("1111111111111111111", leaderboard);
  // });
};
