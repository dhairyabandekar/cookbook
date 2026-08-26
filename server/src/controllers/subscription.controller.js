const User = require("../models/User.model");

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
        expiryDate.setDate(expiryDate.getDate() + 30);

        user.subscription = {
            plan: "read",
            status: "active",
            startDate,
            expiryDate,
            paymentId: null,
            orderId: null,
        };

        await user.save();

        res.status(200).json({
            success: true,
            message: "Free Read Recipe plan activated successfully.",
            subscription: user.subscription,
        });

    } catch (error) {
        console.error("Activate free plan error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to activate free plan.",
        });
    }
};


// ======================================================
// CREATE READ + WATCH SUBSCRIPTION ORDER
// ======================================================

const createSubscriptionOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Don't create another paid order if already active
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

        const orderId = "SUB-" + Date.now();

        res.status(201).json({
            success: true,
            message: "Subscription order created successfully.",
            order: {
                orderId,
                plan: "read_watch",
                amount: READ_WATCH_PRICE,
            },
        });

    } catch (error) {
        console.error(
            "Create subscription order error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to create subscription order.",
        });
    }
};


// ======================================================
// PROCESS READ + WATCH PAYMENT
// ======================================================

const processSubscriptionPayment = async (req, res) => {
    try {
        const { transactionId, orderId } = req.body;

        const userId = req.user.id;

        // Validate transaction ID
        if (!transactionId) {
            return res.status(400).json({
                success: false,
                message: "Transaction ID is required.",
            });
        }

        // Validate order ID
        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required.",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const startDate = new Date();

        // Read + Watch access for 30 days
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        user.subscription = {
            plan: "read_watch",
            status: "active",
            startDate,
            expiryDate,
            paymentId: transactionId,
            orderId,
        };

        await user.save();

        res.status(200).json({
            success: true,
            message:
                "Payment successful. Read + Watch activated.",
            subscription: user.subscription,
        });

    } catch (error) {
        console.error(
            "Subscription payment error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Payment failed.",
        });
    }
};


// ======================================================
// GET CURRENT SUBSCRIPTION
// ======================================================

const getSubscription = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select(
            "subscription"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        let subscription = user.subscription;

        // Check expiry
        if (
            subscription?.status === "active" &&
            subscription?.expiryDate &&
            new Date(subscription.expiryDate) <= new Date()
        ) {
            user.subscription.status = "expired";

            await user.save();

            subscription = user.subscription;
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
            message: "Failed to get subscription.",
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