const express = require("express");

const {
    activateFreePlan,
    createSubscriptionOrder,
    processSubscriptionPayment,
    getSubscription,
} = require("../controllers/subscription.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.post(
    "/free",
    authMiddleware,
    activateFreePlan
);

router.post(
    "/order",
    authMiddleware,
    createSubscriptionOrder
);

router.patch(
    "/payment",
    authMiddleware,
    processSubscriptionPayment
);

router.get(
    "/",
    authMiddleware,
    getSubscription
);

module.exports = router;