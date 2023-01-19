const Sequelize = require("sequelize");
const sequelize = require("../database/sqlDatabase");

const Expenses = sequelize.define("expenses", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  incomeExpense: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Expenses;
