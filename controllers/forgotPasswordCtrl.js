const path = require("path");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const Users = require("../modals/users");
const rootDir = require("../util/rootDir");
const forgotPassword = require("../modals/forgotPassword");

exports.getForgotPasswordData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "forgotPassword.html"));
};

exports.postForgotData = async (req, res, next) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (user) {
      const id = uuid.v4();
      forgotPassword
        .create({ id, isActive: true, userId: user.id })
        .then((response) => {
          res.redirect(`/resetPassword/${id}`);
        });
    } else {
      throw new Error("User Not Found.");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  const resetId = req.params.resetId;
  const resetPasswordRow = await forgotPassword.findOne({
    where: { id: resetId }
  });
  if (resetPasswordRow.isActive) {
    res.status(201).sendFile(path.join(rootDir, "views", "resetPassword.html"));
  } else {
    console.log("No reset");
  }
};

exports.postPasswordData = async (req, res, next) => {
  const { password, confirmPassword, resetId } = req.body;
  console.log(password, confirmPassword, resetId);
  const resetPasswordRow = await forgotPassword.findOne({
    where: { id: resetId }
  });
  const user = await Users.findOne({ where: { id: resetPasswordRow.userId } });
  if (user) {
    bcrypt.hash(password, 10, async (err, hash) => {
      console.log(hash);
      Users.update({ password: hash }, { where: { id: user.id } }).then(() => {
        res.redirect("/forgotPassword");
      });
    });
  }
};
