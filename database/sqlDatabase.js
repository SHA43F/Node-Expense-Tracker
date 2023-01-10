const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-tracker", "root", "Sqlroot@1", {
  host: "localhost",
  dialect: "mysql"
});

module.exports = sequelize;
