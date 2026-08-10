const User = require("../models/User.model");
const Recipe = require("../models/Recipe.model");

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRecipes = await Recipe.countDocuments();

    const categoryStats = await Recipe.aggregate([
      {
        $group: {
          _id: "$course",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log("CATEGORY STATS:", categoryStats);

    const recipesByCategory = {
      Snacks: 0,
      Starter: 0,
      "Main Course": 0,
      Dessert: 0,
    };

    categoryStats.forEach((item) => {
      console.log(
        "CATEGORY:",
        item._id,
        "COUNT:",
        item.count
      );

      if (item._id) {
        recipesByCategory[item._id] = item.count;
      }
    });

    console.log(
      "FINAL CATEGORY COUNTS:",
      recipesByCategory
    );

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