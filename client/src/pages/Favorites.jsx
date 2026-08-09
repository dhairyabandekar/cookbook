import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import { FavoritesContext } from "../context/FavoritesContext";
import { getRecipes } from "../services/recipe.service";

function Favorite() {
  const { favorites } = useContext(FavoritesContext);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all recipes from MongoDB
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getRecipes();

        if (data.success) {
          setRecipes(data.recipes);
        } else {
          setError("Failed to load recipes.");
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        setError("Unable to load recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Convert favorite IDs into recipe objects
  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-xl font-semibold text-orange-500">
          Loading favorites...
        </p>
      </main>
    );
  }

  // Error
  if (error) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-red-500 font-semibold">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 px-4 sm:px-6 lg:px-8 py-10">
      <section className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-500">
            ❤️ Favorite Recipes
          </h1>

          <p className="text-gray-600 mt-2">
            All the recipes you've liked appear here.
          </p>
        </div>

        {favoriteRecipes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 sm:p-16 text-center">

            <div className="text-7xl mb-6">
              💔
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Favorite Recipes Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Start exploring recipes and tap the ❤️ icon
              to save your favorite recipes.
            </p>

            <Link
              to="/recipes"
              className="inline-block mt-8 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
            >
              Browse Recipes
            </Link>

          </div>
        ) : (
          <RecipeList recipes={favoriteRecipes} />
        )}

      </section>
    </main>
  );
}

export default Favorite;