const Sequelize = require("sequelize");
const sequelize = require("../database/sqlDatabase");

const FileDownloads = sequelize.define("fileDownloads", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = FileDownloads;
