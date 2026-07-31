import { useContext } from "react";
import { Link } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import { FavoritesContext } from "../context/FavoritesContext";
import recipes from "../data/recipes"; // Adjust path if needed

function Favorite() {
  const { favorites } = useContext(FavoritesContext);

  // Convert favorite IDs into recipe objects
  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  return (
    <main className="min-h-screen bg-orange-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

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

            <div className="text-7xl mb-6">💔</div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Favorite Recipes Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Start exploring recipes and tap the ❤️ icon to save your favorite recipes.
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