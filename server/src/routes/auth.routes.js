const express = require("express");

const {
    register,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    resendOTP,
} = require("../controllers/auth.controller");

const router = express.Router();

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Verify OTP
router.post("/verify-otp", verifyOTP);

// Reset Password
router.post("/reset-password", resetPassword);

// Resend OTP
router.post("/resend-otp", resendOTP);

module.exports = router;