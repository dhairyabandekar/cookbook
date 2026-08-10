const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");

const getAdminStats = async (req, res) => {
  try {
    // Total registered users
    const totalUsers = await User.countDocuments();

    // Total recipes
    const totalRecipes = await Recipe.countDocuments();

    // Recipes grouped by category
    const categoryStats = await Recipe.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);

    const recipesByCategory = {
      Snacks: 0,
      Starter: 0,
      "Main Course": 0,
      Dessert: 0,
    };

    categoryStats.forEach((item) => {
      if (item._id) {
        recipesByCategory[item._id] = item.count;
      }
    });

    res.status(200).json({
      success: true,
      totalUsers,
      totalRecipes,
      recipesByCategory,
    });
  } catch (error) {
    console.error("Admin stats error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch admin statistics",
    });
  }
};

module.exports = {
  getAdminStats,
};