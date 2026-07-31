const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const {
  getProfile,
  getFavorites,
  toggleFavorite,
} = require("../controllers/user.controller");

const router = express.Router();

// Profile
router.get("/me", authMiddleware, getProfile);

// Favorites
router.get("/favorites", authMiddleware, getFavorites);

router.post("/favorites", authMiddleware, toggleFavorite);

module.exports = router;