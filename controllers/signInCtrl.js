const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../modals/users");
require("dotenv").config();
const sendGrid = require("@sendgrid/mail");
sendGrid.setApiKey(process.env.SENDGRID_KEY);

const rootDir = require("../util/rootDir");

exports.getSignInData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "signIn.html"));
  console.log(process.env.SENDGRID_KEY);
};

exports.getForgotPasswordData = (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "forgotPassword.html"));
};

exports.postForgotData = (req, res, next) => {
  const msg = {
    to: req.body.email,
    from: "shareefpmk44@gmail.com",
    subject: "Test Subject",
    text: "This is test mail.",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>"
  };
  sendGrid
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/signIn");
};

exports.postSignInData = (req, res, next) => {
  const signInData = {
    email: req.body.email,
    password: req.body.password
  };
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
            if (emailExistance.isPremiumUser === 1) {
              return res.json({ token: token, isPremiumUser: true });
            }
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
