const User = require("../models/User.model");

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

        // If user already has an active subscription,
        // don't overwrite it.
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


module.exports = {
    activateFreePlan,
    getSubscription,
};