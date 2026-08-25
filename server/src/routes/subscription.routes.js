const express = require("express");

const {
    activateFreePlan,
    getSubscription,
} = require("../controllers/subscription.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Activate FREE Read Recipe plan
router.post(
    "/free",
    authMiddleware,
    activateFreePlan
);

// Get logged-in user's subscription
router.get(
    "/",
    authMiddleware,
    getSubscription
);

module.exports = router;