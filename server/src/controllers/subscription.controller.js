const crypto = require("crypto");
const User = require("../models/User.model");
const razorpay = require("../config/razorpay");

// ======================================================
// PAID PLAN PRICE
// ======================================================

const READ_WATCH_PRICE = 79;


// ======================================================
// ACTIVATE FREE READ RECIPE PLAN
// ======================================================

const activateFreePlan = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Don't overwrite an active subscription
        if (
            user.subscription?.status === "active" &&
            user.subscription?.expiryDate &&
            new Date(user.subscription.expiryDate) > new Date()
        ) {
            return res.status(400).json({
                success: false,
                message: "You already have an active subscription.",
            });
        }

        const startDate = new Date();

        // Free access for 30 days
        const expiryDate = new Date();
        expiryDate.setDate(
            expiryDate.getDate() + 30
        );

        user.subscription = {
            plan: "read",
            status: "active",
            startDate,
            expiryDate,
            paymentId: null,
            orderId: null,
            razorpayOrderId: null,
            razorpaySignature: null,
        };

        await user.save();

        res.status(200).json({
            success: true,
            message:
                "Free Read Recipe plan activated successfully.",
            subscription: user.subscription,
        });

    } catch (error) {
        console.error(
            "Activate free plan error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to activate free plan.",
        });
    }
};


// ======================================================
// CREATE READ + WATCH RAZORPAY ORDER
// ======================================================

const createSubscriptionOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Check existing active Read + Watch subscription
        if (
            user.subscription?.status === "active" &&
            user.subscription?.plan === "read_watch" &&
            user.subscription?.expiryDate &&
            new Date(user.subscription.expiryDate) > new Date()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "You already have an active Read + Watch subscription.",
            });
        }

        // Amount in INR
        const amount = READ_WATCH_PRICE;

        // Your internal subscription order ID
        const receipt = "SUB-" + Date.now();

        // ==================================================
        // CREATE RAZORPAY ORDER
        // ==================================================

        const razorpayOrder =
            await razorpay.orders.create({
                amount: amount * 100,
                currency: "INR",
                receipt: receipt,

                notes: {
                    userId: userId.toString(),
                    plan: "read_watch",
                },
            });

        console.log(
            "✅ RAZORPAY ORDER CREATED:",
            razorpayOrder.id
        );

        // ==================================================
        // SEND ORDER TO FRONTEND
        // ==================================================

        res.status(201).json({
            success: true,

            message:
                "Subscription order created successfully.",

            order: {
                orderId: receipt,

                razorpayOrderId:
                    razorpayOrder.id,

                amount: amount,

                currency: "INR",

                plan: "read_watch",
            },
        });

    } catch (error) {
        console.error(
            "❌ Create subscription order error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to create subscription order.",
            error: error.message,
        });
    }
};


// ======================================================
// VERIFY RAZORPAY PAYMENT
// ======================================================

const processSubscriptionPayment = async (
    req,
    res
) => {
    try {
        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
            orderId,
        } = req.body;

        const userId = req.user.id;

        console.log("========== RAZORPAY PAYMENT DEBUG ==========");
        console.log("Payment ID:", razorpay_payment_id);
        console.log("Razorpay Order ID:", razorpay_order_id);
        console.log("Signature:", razorpay_signature);
        console.log("Subscription Order ID:", orderId);
        console.log("============================================");

        // ==================================================
        // VALIDATE PAYMENT DATA
        // ==================================================

        if (
            !razorpay_payment_id ||
            !razorpay_order_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid Razorpay payment details.",
            });
        }

        if (!orderId) {
            return res.status(400).json({
                success: false,
                message:
                    "Subscription order ID is required.",
            });
        }

        // ==================================================
        // FIND USER
        // ==================================================

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // ==================================================
        // VERIFY RAZORPAY SIGNATURE
        // ==================================================

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(
                    `${razorpay_order_id}|${razorpay_payment_id}`
                )
                .digest("hex");

        console.log("Generated Signature:", generatedSignature);
        console.log(
            "Signature Match:",
            generatedSignature === razorpay_signature
        );

        const isValid =
            generatedSignature ===
            razorpay_signature;

        if (!isValid) {
            console.error(
                "❌ Invalid Razorpay signature."
            );

            return res.status(400).json({
                success: false,
                message:
                    "Payment verification failed.",
            });
        }

        console.log(
            "✅ Razorpay payment signature verified."
        );

        // ==================================================
        // ACTIVATE READ + WATCH SUBSCRIPTION
        // ==================================================

        const startDate = new Date();

        const expiryDate = new Date();

        expiryDate.setDate(
            expiryDate.getDate() + 30
        );

        user.subscription = {
            plan: "read_watch",

            status: "active",

            startDate,

            expiryDate,

            paymentId:
                razorpay_payment_id,

            orderId,

            razorpayOrderId:
                razorpay_order_id,

            razorpaySignature:
                razorpay_signature,
        };

        await user.save();

        console.log(
            "✅ Read + Watch subscription activated."
        );

        // ==================================================
        // RESPONSE
        // ==================================================

        res.status(200).json({
            success: true,

            message:
                "Payment verified successfully. Read + Watch activated.",

            subscription:
                user.subscription,
        });

    } catch (error) {
        console.error(
            "❌ Subscription payment verification error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Payment verification failed.",
            error: error.message,
        });
    }
};


// ======================================================
// GET CURRENT SUBSCRIPTION
// ======================================================

const getSubscription = async (req, res) => {
    try {
        const userId = req.user.id;

        const user =
            await User.findById(userId).select(
                "subscription"
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        let subscription =
            user.subscription;

        // ==================================================
        // CHECK EXPIRY
        // ==================================================

        if (
            subscription?.status === "active" &&
            subscription?.expiryDate &&
            new Date(
                subscription.expiryDate
            ) <= new Date()
        ) {
            user.subscription.status =
                "expired";

            await user.save();

            subscription =
                user.subscription;
        }

        res.status(200).json({
            success: true,
            subscription,
        });

    } catch (error) {
        console.error(
            "Get subscription error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to get subscription.",
            error: error.message,
        });
    }
};


// ======================================================
// EXPORT
// ======================================================

module.exports = {
    activateFreePlan,
    createSubscriptionOrder,
    processSubscriptionPayment,
    getSubscription,
};