const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utlis/wrapAsync.js");
const passport = require("passport");
const{saveRedirectUrl} = require("../middleware.js");
const userController = require("../controllers/users.js");
//FOR SIGNUP
router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapAsync(userController.signup));

//FOR LOGIN
router.get("/login", userController.renderLoginForm);

router.post("/login", saveRedirectUrl, passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), userController.login);

//LOGOUT USER

 router.get("/logout", userController.logout);


module.exports = router;
