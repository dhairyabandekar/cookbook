const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const recipeRoutes = require("./routes/recipe.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "CookBook API is running 🚀",
    });
});

module.exports = app;