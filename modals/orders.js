const Sequelize = require("sequelize");
const sequelize = require("../database/sqlDatabase");

const Orders = sequelize.define("orders", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  paymentId: {
    type: Sequelize.STRING,
    allowNull: true
  },
  orderId: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  }
});

module.exports = Orders;
