const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  getRecipes,
  getRecipeById,
  createRecipe,
} = require("../controllers/recipe.controller");

const router = express.Router();

// Public routes
router.get("/", getRecipes);
router.get("/:id", getRecipeById);

// Admin-only route
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createRecipe
);

module.exports = router;