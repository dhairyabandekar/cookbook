const User = require("../models/User.model");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get Favorites
const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("favorites");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Add/Remove Favorite
const toggleFavorite = async (req, res) => {
  try {
    const { recipeId } = req.body;

    if (recipeId === undefined) {
      return res.status(400).json({
        success: false,
        message: "Recipe ID is required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const exists = user.favorites.includes(recipeId);

    if (exists) {
      user.favorites = user.favorites.filter((id) => id !== recipeId);
    } else {
      user.favorites.push(recipeId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  getProfile,
  getFavorites,
  toggleFavorite,
};