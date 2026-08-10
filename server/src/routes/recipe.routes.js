const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
  getRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
  updateRecipe,
} = require("../controllers/recipe.controller");

const router = express.Router();

// ==========================================
// Public routes
// ==========================================

// Get all recipes
router.get("/", getRecipes);

// Get single recipe
router.get("/:id", getRecipeById);


// ==========================================
// Admin-only routes
// ==========================================

// Add recipe
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createRecipe
);

// Delete recipe
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteRecipe
);

// Update recipe
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateRecipe
);

module.exports = router;