const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../modals/users");

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
  Users.findAll().then((users) => {
    const emailExistance = users.find((user) => user.email === req.body.email);
    if (emailExistance) {
      bcrypt.compare(
        req.body.password,
        emailExistance.password,
        (err, result) => {
          if (err) {
            res.status(500).send("<h3>Some Error Happened..</h3>");
          }
          if (result) {
            const token = jwt.sign(
              {
                id: emailExistance.id,
                userName: emailExistance.userName
              },
              "secret-key"
            );
            console.log(token);
            res.json({ token: token });
          } else {
            res.status(401).send("<h3>Incorrect password.. Try again</h3>");
          }
        }
      );
    } else {
      res.status(404).send("<h3>No Email Found</h3>");
    }
  });
};
