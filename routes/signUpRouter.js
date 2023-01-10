const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "views", "signUp.html"));
});

router.post("/signUp", (req, res, next) => {
  const signUpInfo = {
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  };
  console.log(signUpInfo);
  res.redirect("/");
});

module.exports = router;
