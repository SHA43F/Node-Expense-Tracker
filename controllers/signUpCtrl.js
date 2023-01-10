const path = require("path");
const rootDir = require("../util/rootDir");
const Users = require("../modals/users");
const bcrypt = require("bcrypt");

exports.getSignUpData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "signUp.html"));
};

exports.postSignUpData = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      await Users.create({
        userName: userName,
        email: email,
        password: hash
      })
        .then(() => {
          res.redirect("/signUp");
        })
        .catch((err) => {
          console.log(err);
          res.send(`<p>${err}</p>`);
        });
    });
  } catch (err) {
    console.log(err);
  }
};
