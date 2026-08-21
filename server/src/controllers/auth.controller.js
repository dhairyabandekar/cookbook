const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// ======================================================
// EMAIL TRANSPORTER
// ======================================================

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


// ======================================================
// REGISTER USER
// ======================================================

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Email validation
        const emailRegex = /^\S+@\S+\.\S+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email address",
            });
        }

        // Password validation
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Register error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


// ======================================================
// LOGIN USER
// ======================================================

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase(),
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


// ======================================================
// FORGOT PASSWORD - SEND OTP
// ======================================================

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: normalizedEmail,
        });

        // Don't reveal whether an account exists
        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, an OTP has been sent.",
            });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // Hash OTP before storing
        const hashedOTP = await bcrypt.hash(otp, 10);

        // OTP expires in 10 minutes
        const otpExpiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        user.resetPasswordOTP = hashedOTP;
        user.resetPasswordOTPExpires = otpExpiry;
        user.resetPasswordVerified = false;

        await user.save();

        // Send OTP email
        await transporter.sendMail({
            from: `"Cook Book" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Password Reset OTP — Cook Book 🍳",
            html: `
                <div style="
                    margin:0;
                    padding:0;
                    width:100%;
                    background:#fff7ed;
                    font-family:Arial,Helvetica,sans-serif;
                ">

                    <div style="
                        max-width:600px;
                        margin:0 auto;
                        padding:30px 15px;
                    ">

                        <div style="
                            background:#ffffff;
                            border-radius:16px;
                            overflow:hidden;
                            border:1px solid #fed7aa;
                        ">

                            <!-- Header -->
                            <div style="
                                background:#f97316;
                                padding:24px 28px;
                                text-align:left;
                            ">

                                <div style="
                                    font-size:28px;
                                    font-weight:bold;
                                    color:#ffffff;
                                ">
                                    🍳 Cook Book
                                </div>

                                <div style="
                                    margin-top:6px;
                                    font-size:14px;
                                    color:#fff7ed;
                                ">
                                    Discover. Cook. Enjoy.
                                </div>

                            </div>


                            <!-- Content -->
                            <div style="
                                padding:35px 30px;
                                color:#374151;
                                font-size:16px;
                                line-height:1.7;
                            ">

                                <h2 style="
                                    margin:0 0 20px 0;
                                    color:#ea580c;
                                    font-size:26px;
                                ">
                                    Password Reset
                                </h2>

                                <p>
                                    Hi <strong>${user.name}</strong>,
                                </p>

                                <p>
                                    We received a request to reset your
                                    Cook Book account password.
                                </p>

                                <p>
                                    Use the following OTP to continue:
                                </p>

                                <div style="
                                    margin:25px 0;
                                    padding:20px;
                                    background:#fff7ed;
                                    border:1px solid #fed7aa;
                                    border-radius:10px;
                                    text-align:center;
                                ">

                                    <div style="
                                        font-size:13px;
                                        color:#9ca3af;
                                        margin-bottom:8px;
                                    ">
                                        YOUR OTP
                                    </div>

                                    <div style="
                                        font-size:34px;
                                        font-weight:bold;
                                        letter-spacing:8px;
                                        color:#ea580c;
                                    ">
                                        ${otp}
                                    </div>

                                </div>

                                <p>
                                    This OTP is valid for
                                    <strong>10 minutes</strong>.
                                </p>

                                <p>
                                    If you did not request a password
                                    reset, you can safely ignore this email.
                                </p>

                                <p style="
                                    margin-top:25px;
                                    font-weight:bold;
                                    color:#ea580c;
                                ">
                                    Happy Cooking! 🍳
                                </p>

                                <p style="
                                    margin:3px 0 0 0;
                                    color:#6b7280;
                                ">
                                    — Team Cook Book
                                </p>

                            </div>


                            <!-- Footer -->
                            <div style="
                                background:#fff7ed;
                                padding:20px 28px;
                                border-top:1px solid #fed7aa;
                            ">

                                <div style="
                                    font-size:14px;
                                    font-weight:bold;
                                    color:#ea580c;
                                ">
                                    🍳 Cook Book
                                </div>

                                <div style="
                                    margin-top:5px;
                                    font-size:12px;
                                    color:#9ca3af;
                                ">
                                    This is an automated email.
                                </div>

                            </div>

                        </div>

                    </div>

                </div>
            `,
        });

        res.status(200).json({
            success: true,
            message:
                "If an account exists with this email, an OTP has been sent.",
        });
    } catch (error) {
        console.error("Forgot password error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to send OTP",
        });
    }
};


// ======================================================
// VERIFY OTP
// ======================================================

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        // Check whether OTP exists
        if (
            !user.resetPasswordOTP ||
            !user.resetPasswordOTPExpires
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired OTP",
            });
        }

        // Check expiry
        if (
            user.resetPasswordOTPExpires.getTime() <
            Date.now()
        ) {
            user.resetPasswordOTP = null;
            user.resetPasswordOTPExpires = null;
            user.resetPasswordVerified = false;

            await user.save();

            return res.status(400).json({
                success: false,
                message:
                    "OTP has expired. Please request a new OTP.",
            });
        }

        // Compare OTP
        const isValidOTP = await bcrypt.compare(
            otp.toString(),
            user.resetPasswordOTP
        );

        if (!isValidOTP) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // OTP verified
        user.resetPasswordVerified = true;

        await user.save();

        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        });
    } catch (error) {
        console.error("Verify OTP error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to verify OTP",
        });
    }
};


// ======================================================
// RESET PASSWORD
// ======================================================

const resetPassword = async (req, res) => {
    try {
        const {
            email,
            newPassword,
            confirmPassword,
        } = req.body;

        if (
            !email ||
            !newPassword ||
            !confirmPassword
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Same password rules as registration
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
            });
        }

        const user = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Make sure OTP was verified
        if (!user.resetPasswordVerified) {
            return res.status(403).json({
                success: false,
                message:
                    "Please verify the OTP before resetting your password.",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        user.password = hashedPassword;

        // Clear reset fields
        user.resetPasswordOTP = null;
        user.resetPasswordOTPExpires = null;
        user.resetPasswordVerified = false;

        await user.save();

        res.status(200).json({
            success: true,
            message:
                "Password reset successfully. You can now login.",
        });
    } catch (error) {
        console.error("Reset password error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to reset password",
        });
    }
};


// ======================================================
// RESEND OTP
// ======================================================

const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(200).json({
                success: true,
                message:
                    "If an account exists with this email, a new OTP has been sent.",
            });
        }

        // Generate new OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // Hash OTP
        const hashedOTP = await bcrypt.hash(otp, 10);

        // New expiry - 10 minutes
        const otpExpiry = new Date(
            Date.now() + 10 * 60 * 1000
        );

        user.resetPasswordOTP = hashedOTP;
        user.resetPasswordOTPExpires = otpExpiry;
        user.resetPasswordVerified = false;

        await user.save();

        // Send new OTP email
        await transporter.sendMail({
            from: `"Cook Book" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: "Your New Password Reset OTP — Cook Book 🍳",
            html: `
                <div style="
                    font-family:Arial,Helvetica,sans-serif;
                    background:#fff7ed;
                    padding:30px;
                ">

                    <div style="
                        max-width:600px;
                        margin:auto;
                        background:#ffffff;
                        border-radius:16px;
                        overflow:hidden;
                        border:1px solid #fed7aa;
                    ">

                        <div style="
                            background:#f97316;
                            padding:24px 28px;
                            text-align:left;
                        ">

                            <div style="
                                color:#ffffff;
                                font-size:28px;
                                font-weight:bold;
                            ">
                                🍳 Cook Book
                            </div>

                            <div style="
                                color:#fff7ed;
                                font-size:14px;
                                margin-top:6px;
                            ">
                                Discover. Cook. Enjoy.
                            </div>

                        </div>

                        <div style="
                            padding:30px;
                            color:#374151;
                            line-height:1.7;
                        ">

                            <h2 style="color:#ea580c;">
                                Your New OTP
                            </h2>

                            <p>
                                Hi <strong>${user.name}</strong>,
                            </p>

                            <p>
                                Here is your new OTP for resetting
                                your Cook Book password:
                            </p>

                            <div style="
                                background:#fff7ed;
                                border:1px solid #fed7aa;
                                border-radius:10px;
                                padding:20px;
                                text-align:center;
                                margin:25px 0;
                            ">

                                <div style="
                                    font-size:34px;
                                    font-weight:bold;
                                    letter-spacing:8px;
                                    color:#ea580c;
                                ">
                                    ${otp}
                                </div>

                            </div>

                            <p>
                                This OTP is valid for
                                <strong>10 minutes</strong>.
                            </p>

                            <p>
                                If you did not request this OTP,
                                please ignore this email.
                            </p>

                            <p style="
                                color:#ea580c;
                                font-weight:bold;
                            ">
                                Happy Cooking! 🍳
                            </p>

                            <p style="color:#6b7280;">
                                — Team Cook Book
                            </p>

                        </div>

                    </div>

                </div>
            `,
        });

        res.status(200).json({
            success: true,
            message:
                "If an account exists with this email, a new OTP has been sent.",
        });
    } catch (error) {
        console.error("Resend OTP error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to resend OTP",
        });
    }
};


// ======================================================
// EXPORTS
// ======================================================

module.exports = {
    register,
    login,
    forgotPassword,
    verifyOTP,
    resetPassword,
    resendOTP,
};