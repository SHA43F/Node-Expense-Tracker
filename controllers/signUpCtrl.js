const path = require("path");
const Users = require("../modals/users");

exports.getSignUpData = (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "signUp.html"));
};

exports.postSignUpData = (req, res, next) => {
  Users.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};
