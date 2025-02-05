const express = require("express");

const {
  getusers,
  createUser,
  userSignin,
  verifyEmail,
  resendVerificationEmail,
  GoogleSignIn,
  forgotPassword,
  resetPassword,
} = require("../Controllers/userController");

const router = express.Router();

// get Users Table
router.get("/", getusers);
//register user
router.post("/register", createUser);

// Login user
router.post("/signin", userSignin);

//login using signin button

router.post("/auth/google", GoogleSignIn);

router.get("/verifyEmail", verifyEmail);

router.post("/reVerifyMail", resendVerificationEmail);

//reset password routes
router.post("/forget-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
