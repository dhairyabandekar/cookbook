const Recipe = require("../models/Recipe.model");

// ==========================================
// Get all recipes
// ==========================================
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      recipes,
    });
  } catch (error) {
    console.error("Get recipes error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recipes",
    });
  }
};

// ==========================================
// Get single recipe
// ==========================================
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({
      id: Number(req.params.id),
    });

    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    console.error("Get recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch recipe",
    });
  }
};

// ==========================================
// Add new recipe - Admin only
// ==========================================
const createRecipe = async (req, res) => {
  try {
    const {
      name,
      category,
      subcategory,
      cuisine,
      diet,
      image,
      url,
      description,
      ingredients,
      process,
      prepTime,
      taste,
      difficulty,
    } = req.body;

    // Required fields
    if (
      !name ||
      !category ||
      !cuisine ||
      !diet ||
      !image ||
      !description ||
      !ingredients ||
      !process ||
      prepTime === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Generate next recipe ID
    const lastRecipe = await Recipe.findOne()
      .sort({ id: -1 })
      .select("id");

    const nextId = lastRecipe ? lastRecipe.id + 1 : 1;

    // Create recipe
    const recipe = await Recipe.create({
      id: nextId,

      name,

      diet,

      cuisine,

      // Form category → database course
      course: category,

      subcategory:
        category === "Main Course"
          ? subcategory || ""
          : "",

      // Defaults until Taste and Difficulty
      // are added to the form
      taste: taste || "Savoury",

      difficulty: difficulty || "Easy",

      image,

      // Form url → database youtube
      youtube: url || "",

      description,

      ingredients,

      // Form process → database steps
      steps: process,

      // Form prepTime → database time
      time: Number(prepTime),

      // Logged-in admin
      addedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Recipe added successfully",
      recipe,
    });
  } catch (error) {
    console.error("Create recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add recipe",
      error: error.message,
    });
  }
};

// ==========================================
// Delete recipe - Admin only
// ==========================================
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = Number(req.params.id);

    // Find recipe
    const recipe = await Recipe.findOne({
      id: recipeId,
    });

    // Recipe doesn't exist
    if (!recipe) {
      return res.status(404).json({
        success: false,
        message: "Recipe not found",
      });
    }

    // Delete recipe
    await Recipe.deleteOne({
      id: recipeId,
    });

    res.status(200).json({
      success: true,
      message: "Recipe deleted successfully",
    });
  } catch (error) {
    console.error("Delete recipe error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete recipe",
    });
  }
};

// ==========================================
// Export controllers
// ==========================================
module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  deleteRecipe,
};