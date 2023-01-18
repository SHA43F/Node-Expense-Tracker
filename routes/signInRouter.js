const express = require("express");
const router = express.Router();
const signInController = require("../controllers/signInCtrl");

router.get("/signIn", signInController.getSignInData);

router.post("/signIn", signInController.postSignInData);

router.get("/forgotPassword", signInController.getForgotPasswordData);

router.post("/forgotPasswordCalled", signInController.postForgotData);

module.exports = router;
