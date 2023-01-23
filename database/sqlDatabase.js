const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_POSITION,
  process.env.DATABASE_AUTH,
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql"
  }
);

module.exports = sequelize;
