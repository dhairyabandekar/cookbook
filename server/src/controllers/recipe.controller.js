const Recipe = require("../models/Recipe.model");

// Get all recipes
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

// Get single recipe
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ id: Number(req.params.id) });

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

// Add new recipe - Admin only
const createRecipe = async (req, res) => {
  try {
    const {
      name,
      diet,
      cuisine,
      taste,
      course,
      subcategory,
      time,
      difficulty,
      image,
      youtube,
      description,
      ingredients,
      steps,
    } = req.body;

    // Required fields
    if (
      !name ||
      !diet ||
      !cuisine ||
      !taste ||
      !course ||
      !time ||
      !difficulty ||
      !image ||
      !description ||
      !ingredients ||
      !steps
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

    const recipe = await Recipe.create({
      id: nextId,
      name,
      diet,
      cuisine,
      taste,
      course,
      subcategory: subcategory || "",
      time,
      difficulty,
      image,
      youtube: youtube || "",
      description,
      ingredients,
      steps,
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
    });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
};