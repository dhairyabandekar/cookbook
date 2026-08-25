const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    favorites: [
      {
        type: Number,
      },
    ],

    // Password Reset Fields
    resetPasswordOTP: {
      type: String,
      default: null,
    },

    resetPasswordOTPExpires: {
      type: Date,
      default: null,
    },

    resetPasswordVerified: {
      type: Boolean,
      default: false,
    },

    // Subscription
    subscription: {
      plan: {
        type: String,
        enum: ["read", "read_watch"],
        default: null,
      },

      status: {
        type: String,
        enum: ["active", "expired", "cancelled"],
        default: null,
      },

      startDate: {
        type: Date,
        default: null,
      },

      expiryDate: {
        type: Date,
        default: null,
      },

      paymentId: {
        type: String,
        default: null,
      },

      orderId: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);