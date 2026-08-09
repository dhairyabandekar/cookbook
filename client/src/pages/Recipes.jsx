import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import Filters from "../components/Filters";
import { getRecipes } from "../services/recipe.service";

function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();

  const courseFromURL = searchParams.get("course") || "All";
  const subcategoryFromURL =
    searchParams.get("subcategory") || "All";

  const [showFilters, setShowFilters] = useState(false);

  // Recipes fetched from MongoDB
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    search: "",
    diet: "All",
    cuisine: "All",
    taste: "All",
    course: courseFromURL,
    subcategory: subcategoryFromURL,
  });

  // Fetch recipes from backend
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

  // Update filters from URL
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      course: courseFromURL,
      subcategory: subcategoryFromURL,
    }));
  }, [courseFromURL, subcategoryFromURL]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      diet: "All",
      cuisine: "All",
      taste: "All",
      course: "All",
      subcategory: "All",
    });

    setSearchParams({});
  };

  // Filter recipes
  const filteredRecipes = recipes.filter((recipe) => {
    return (
      (filters.search === "" ||
        recipe.name
          .toLowerCase()
          .includes(filters.search.toLowerCase())) &&
      (filters.diet === "All" ||
        recipe.diet === filters.diet) &&
      (filters.cuisine === "All" ||
        recipe.cuisine === filters.cuisine) &&
      (filters.taste === "All" ||
        recipe.taste === filters.taste) &&
      (filters.course === "All" ||
        recipe.course === filters.course) &&
      (filters.subcategory === "All" ||
        recipe.subcategory === filters.subcategory)
    );
  });

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-orange-500">
            Loading recipes...
          </p>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-red-500 font-semibold">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-orange-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-orange-500">
            Explore Recipes
          </h1>

          <p className="text-gray-600 mt-2">
            Discover delicious recipes for every occasion.
          </p>
        </div>

        {/* Filters */}
        <Filters
          filters={filters}
          setFilters={setFilters}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          clearFilters={clearFilters}
        />

        {/* Recipe Count */}
        <div className="mb-5">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">
              {filteredRecipes.length}
            </span>{" "}
            {filteredRecipes.length === 1 ? "recipe" : "recipes"}
          </p>
        </div>

        {/* Recipe List */}
        {filteredRecipes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
            <div className="text-6xl mb-4">🍳</div>

            <h2 className="text-2xl font-bold text-gray-800">
              No Recipes Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing or clearing your filters.
            </p>

            <button
              onClick={clearFilters}
              className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <RecipeList recipes={filteredRecipes} />
        )}

      </section>
    </main>
  );
}

export default Recipes;