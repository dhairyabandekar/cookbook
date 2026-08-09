const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    diet: {
      type: String,
      enum: ["Veg", "Non-Veg"],
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
      trim: true,
    },

    taste: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    subcategory: {
      type: String,
      default: "",
      trim: true,
    },

    time: {
      type: Number,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    youtube: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    ingredients: [
      {
        type: String,
        required: true,
      },
    ],

    steps: [
      {
        type: String,
        required: true,
      },
    ],

    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", recipeSchema);