const jwt = require("jsonwebtoken");
const Users = require("../modals/users");

exports.retrieveUserId = (req, res, next) => {
  try {
    const token = req.header("Auth");
    const tokenData = jwt.verify(token, "secret-key");
    Users.findByPk(tokenData.id).then((user) => {
      req.user = user;
      console.log(user);
      next();
    });
  } catch (err) {
    console.log(err);
  }
};
