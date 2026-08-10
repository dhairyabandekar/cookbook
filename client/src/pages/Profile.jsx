import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaHeart, FaUsers, FaUtensils, FaPlus } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";
import { createRecipe } from "../services/recipe.service";
import API from "../api/axios";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState("");

  const [showAddRecipe, setShowAddRecipe] = useState(false);
  const [recipeForm, setRecipeForm] = useState({
    name: "",
    category: "",
    subcategory: "",
    cuisine: "",
    diet: "",
    image: "",
    url: "",
    description: "",
    ingredients: "",
    process: "",
    prepTime: "",
  });

  const [recipeMessage, setRecipeMessage] = useState("");
  const [recipeError, setRecipeError] = useState("");
  const [addingRecipe, setAddingRecipe] = useState(false);

  const isAdmin = user?.role === "admin";

  // Fetch admin statistics

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    const fetchAdminStats = async () => {
      try {
        setLoadingStats(true);
        setStatsError("");

        const response = await API.get("/admin/stats");

        if (response.data.success) {
          setStats(response.data);
        } else {
          setStatsError("Failed to load admin statistics.");
        }
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);

        setStatsError(
          error.response?.data?.message ||
          "Unable to load admin statistics."
        );
      } finally {
        setLoadingStats(false);
      }
    };

    fetchAdminStats();
  }, [isAdmin]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleRecipeChange = (e) => {
    const { name, value } = e.target;

    setRecipeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddRecipe = async (e) => {
    e.preventDefault();

    try {
      setAddingRecipe(true);
      setRecipeMessage("");
      setRecipeError("");

      const recipeData = {
        name: recipeForm.name,
        category: recipeForm.category,
        subcategory:
          recipeForm.category === "Main Course"
            ? recipeForm.subcategory
            : "All",
        cuisine: recipeForm.cuisine,
        diet: recipeForm.diet,
        image: recipeForm.image,
        url: recipeForm.url,
        description: recipeForm.description,

        // Convert lines into arrays
        ingredients: recipeForm.ingredients
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item !== ""),

        process: recipeForm.process
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item !== ""),

        prepTime: Number(recipeForm.prepTime),
      };

      console.log("RECIPE DATA BEING SENT:", recipeData);
      const data = await createRecipe(recipeData);

      if (data.success) {
        setRecipeMessage("Recipe added successfully! 🎉");

        // Clear form
        setRecipeForm({
          name: "",
          category: "",
          subcategory: "",
          cuisine: "",
          diet: "",
          image: "",
          url: "",
          description: "",
          ingredients: "",
          process: "",
          prepTime: "",
        });

        // Close popup after successful submission
        setTimeout(() => {
          setShowAddRecipe(false);
          setRecipeMessage("");
        }, 1200);
      } else {
        setRecipeError(
          data.message || "Failed to add recipe."
        );
      }
    } catch (error) {
      console.error("Add recipe error:", error);
      console.log("BACKEND RESPONSE:", error.response?.data);
      setRecipeError(
        error.response?.data?.message ||
        "Unable to add recipe."
      );
    } finally {
      setAddingRecipe(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 px-4 sm:px-6 lg:px-8 py-10">
      <section className="max-w-5xl mx-auto">

        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 lg:p-10">

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-500 mb-8">
            My Profile
          </h1>

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6 border-b pb-8">

            {/* Avatar */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-orange-100 flex items-center justify-center shadow-md shrink-0">
              <FaUserCircle className="text-6xl sm:text-8xl text-orange-500" />
            </div>

            {/* User Info */}
            <div className="text-center sm:text-left min-w-0">

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 wrap-break-word">
                {user?.name}
              </h2>

              <p className="text-gray-500 mt-2 text-base sm:text-lg break-all">
                {user?.email}
              </p>

              {/* Role */}
              <div className="mt-3">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${isAdmin
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-100 text-gray-600"
                    }`}
                >
                  {isAdmin ? "Admin" : "User"}
                </span>
              </div>

            </div>

          </div>

          {/* Favourite Recipes */}
          <div className="mt-8 bg-orange-100 rounded-xl p-5">

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Favourite Recipes
                </h3>

                <p className="text-gray-600 text-sm sm:text-base mt-1">
                  Recipes you've saved
                </p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <FaHeart className="text-red-500 text-2xl sm:text-3xl" />

                <span className="text-3xl sm:text-4xl font-bold">
                  {favorites.length}
                </span>
              </div>

            </div>

          </div>

          {/* ================= ADMIN SECTION ================= */}
          {isAdmin && (
            <div className="mt-10 border-t pt-8">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Admin Dashboard
                  </h2>

                  <p className="text-gray-500 mt-1">
                    Manage your Cook Book application
                  </p>
                </div>

              </div>

              {/* Stats Loading */}
              {loadingStats && (
                <div className="bg-orange-50 rounded-xl p-6 text-center">
                  <p className="text-orange-500 font-semibold">
                    Loading admin statistics...
                  </p>
                </div>
              )}

              {/* Stats Error */}
              {!loadingStats && statsError && (
                <div className="bg-red-50 text-red-600 rounded-xl p-5">
                  {statsError}
                </div>
              )}

              {/* Stats */}
              {!loadingStats && !statsError && stats && (
                <>
                  {/* Main Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Users */}
                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">

                        <div>
                          <p className="text-gray-600 font-medium">
                            Registered Users
                          </p>

                          <p className="text-4xl font-bold text-gray-800 mt-2">
                            {stats.totalUsers}
                          </p>
                        </div>

                        <FaUsers className="text-4xl text-blue-500" />

                      </div>
                    </div>

                    {/* Recipes */}
                    <div className="bg-green-50 rounded-xl p-6">
                      <div className="flex items-center justify-between">

                        <div>
                          <p className="text-gray-600 font-medium">
                            Total Recipes
                          </p>

                          <p className="text-4xl font-bold text-gray-800 mt-2">
                            {stats.totalRecipes}
                          </p>
                        </div>

                        <FaUtensils className="text-4xl text-green-500" />

                      </div>
                    </div>

                  </div>

                  {/* Category Statistics */}
                  <div className="mt-6">

                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      Recipes by Category
                    </h3>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

                      {/* Snacks */}
                      <div className="bg-yellow-50 rounded-xl p-5 text-center">
                        <p className="text-gray-600">
                          Snacks
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                          {stats.recipesByCategory?.Snacks || 0}
                        </p>
                      </div>

                      {/* Starter */}
                      <div className="bg-pink-50 rounded-xl p-5 text-center">
                        <p className="text-gray-600">
                          Starter
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                          {stats.recipesByCategory?.Starter || 0}
                        </p>
                      </div>

                      {/* Main Course */}
                      <div className="bg-orange-50 rounded-xl p-5 text-center">
                        <p className="text-gray-600">
                          Main Course
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                          {stats.recipesByCategory?.["Main Course"] || 0}
                        </p>
                      </div>

                      {/* Dessert */}
                      <div className="bg-purple-50 rounded-xl p-5 text-center">
                        <p className="text-gray-600">
                          Dessert
                        </p>

                        <p className="text-3xl font-bold text-gray-800 mt-2">
                          {stats.recipesByCategory?.Dessert || 0}
                        </p>
                      </div>

                    </div>

                  </div>
                </>
              )}

            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">

            {/* Add New Recipe - Admin Only */}
            {isAdmin && (
              <button
                onClick={() => setShowAddRecipe(true)}
                className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
              >
                <FaPlus />
                Add New Recipe
              </button>
            )}

            {/* Favourite Recipes */}
            <Link
              to="/favorites"
              className="flex-1 flex items-center justify-center bg-orange-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              View Favourite Recipes
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

          {/* Add Recipe Popup */}
          {showAddRecipe && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

              <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl p-6 sm:p-8">

                {/* Popup Header */}
                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Add New Recipe
                  </h2>

                  <button
                    onClick={() => setShowAddRecipe(false)}
                    className="text-gray-500 hover:text-gray-800 text-2xl"
                  >
                    ×
                  </button>

                </div>

                {recipeMessage && (
                  <div className="bg-green-100 text-green-700 px-4 py-3 rounded-lg">
                    {recipeMessage}
                  </div>
                )}

                {recipeError && (
                  <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">
                    {recipeError}
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleAddRecipe} className="space-y-5">

                  {/* Recipe Name */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Recipe Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={recipeForm.name}
                      onChange={handleRecipeChange}
                      placeholder="Enter recipe name"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>

                  {/* Category + Cuisine */}
                  <div className="grid sm:grid-cols-2 gap-4">

                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        Category
                      </label>

                      <select
                        name="category"
                        value={recipeForm.category}
                        onChange={handleRecipeChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                      >
                        <option value="">Select Category</option>
                        <option value="Snacks">Snacks</option>
                        <option value="Starter">Starter</option>
                        <option value="Main Course">Main Course</option>
                        <option value="Dessert">Dessert</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        Cuisine
                      </label>

                      <select
                        name="cuisine"
                        value={recipeForm.cuisine}
                        onChange={handleRecipeChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-3"
                      >
                        <option value="">Select Cuisine</option>
                        <option value="Indian">Indian</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Italian">Italian</option>
                        <option value="American">American</option>
                      </select>
                    </div>

                  </div>

                  {/* Subcategory */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Subcategory
                    </label>

                    <input
                      type="text"
                      name="subcategory"
                      value={recipeForm.subcategory}
                      onChange={handleRecipeChange}
                      placeholder="Example: Curry, Rice, Pasta"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />

                    <p className="text-sm text-gray-500 mt-1">
                      Mainly used for Main Course recipes.
                    </p>
                  </div>

                  {/* Diet */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Type
                    </label>

                    <div className="flex gap-6">

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="diet"
                          value="Veg"
                          checked={recipeForm.diet === "Veg"}
                          onChange={handleRecipeChange}
                          required
                        />
                        Veg
                      </label>

                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="diet"
                          value="Non-Veg"
                          checked={recipeForm.diet === "Non-Veg"}
                          onChange={handleRecipeChange}
                        />
                        Non-Veg
                      </label>

                    </div>
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Image URL
                    </label>

                    <input
                      type="url"
                      name="image"
                      value={recipeForm.image}
                      onChange={handleRecipeChange}
                      placeholder="https://example.com/image.jpg"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                  </div>

                  {/* Recipe URL */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Recipe URL
                    </label>

                    <input
                      type="url"
                      name="url"
                      value={recipeForm.url}
                      onChange={handleRecipeChange}
                      placeholder="https://youtube.com/..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={recipeForm.description}
                      onChange={handleRecipeChange}
                      rows="3"
                      placeholder="Describe the recipe..."
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
                    />
                  </div>

                  {/* Ingredients */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Ingredients
                    </label>

                    <textarea
                      name="ingredients"
                      value={recipeForm.ingredients}
                      onChange={handleRecipeChange}
                      rows="5"
                      placeholder={`Enter one ingredient per line
250g Paneer
2 Tomatoes
2 tbsp Butter`}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
                    />
                  </div>

                  {/* Process */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Cooking Process
                    </label>

                    <textarea
                      name="process"
                      value={recipeForm.process}
                      onChange={handleRecipeChange}
                      rows="6"
                      placeholder={`Enter one step per line
Heat butter in a pan.
Add onions.
Add tomatoes and cook.
Add paneer.
Serve hot.`}
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none"
                    />
                  </div>

                  {/* Prep Time */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Prep Time (minutes)
                    </label>

                    <input
                      type="number"
                      name="prepTime"
                      value={recipeForm.prepTime}
                      onChange={handleRecipeChange}
                      min="1"
                      placeholder="40"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">

                    <button
                      type="button"
                      onClick={() => setShowAddRecipe(false)}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={addingRecipe}
                      className="flex-1 bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60"
                    >
                      {addingRecipe ? "Adding Recipe..." : "Add Recipe"}
                    </button>

                  </div>

                </form>

              </div>

            </div>
          )}

        </div>

      </section>
    </div>
  );
}

export default Profile;