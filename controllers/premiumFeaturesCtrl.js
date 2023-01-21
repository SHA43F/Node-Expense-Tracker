const path = require("path");
const rootDir = require("../util/rootDir");
const Users = require("../modals/users");
const Expenses = require("../modals/expenses");
const fileDownloads = require("../modals/fileDownloads");
const sequelize = require("../database/sqlDatabase");
const S3services = require("../services/S3services");

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

exports.expenditure = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "premiumExpense.html"));
};

exports.expenditureError = (req, res, next) => {
  res.status(401).send("<h2>Not Authorized</h2>");
};

exports.downloadExpenses = async (req, res, next) => {
  try {
    const expenses = await req.body;
    const userId = req.body.expenses[0].userId;
    const stringifyExpenses = JSON.stringify(expenses);
    const fileName = `Expenses${userId}/Expenses-${new Date()}.txt`;
    const fileUrl = await S3services.uploadToS3(stringifyExpenses, fileName);
    fileDownloads.create({
      url: fileUrl,
      userId
    });
    res.status(200).json({ fileUrl, success: true });
  } catch (err) {
    res.status(500).json({ fileUrl: "", success: false, err: err });
  }
};
