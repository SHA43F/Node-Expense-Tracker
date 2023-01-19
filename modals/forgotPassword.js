const Sequelize = require("sequelize");
const sequelize = require("../database/sqlDatabase");

const FP = sequelize.define("forgotPswd", {
  id: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true
  },
  isActive: Sequelize.BOOLEAN
});

module.exports = FP;
