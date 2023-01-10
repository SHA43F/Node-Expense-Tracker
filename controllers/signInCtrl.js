const path = require("path");

const rootDir = require("../util/rootDir");

exports.getSignInData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "signIn.html"));
};

exports.postSignInData = (req, res, next) => {
  const signInData = {
    email: req.body.email,
    password: req.body.password
  };
  console.log(signInData);
  res.send('<script>alert("Logged In successfully")</script>');
};
