import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeList from "../components/RecipeList";
import Filters from "../components/Filters";
import recipes from "../data/recipes";

function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();

  const courseFromURL = searchParams.get("course") || "All";
  const subcategoryFromURL = searchParams.get("subcategory") || "All";

  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    diet: "All",
    cuisine: "All",
    taste: "All",
    course: courseFromURL,
    subcategory: subcategoryFromURL,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      course: courseFromURL,
      subcategory: subcategoryFromURL,
    }));
  }, [courseFromURL, subcategoryFromURL]);

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

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      (filters.search === "" ||
        recipe.name.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.diet === "All" || recipe.diet === filters.diet) &&
      (filters.cuisine === "All" || recipe.cuisine === filters.cuisine) &&
      (filters.taste === "All" || recipe.taste === filters.taste) &&
      (filters.course === "All" || recipe.course === filters.course) &&
      (filters.subcategory === "All" ||
        recipe.subcategory === filters.subcategory)
    );
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <Filters
        filters={filters}
        setFilters={setFilters}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        clearFilters={clearFilters}
      />

      <RecipeList recipes={filteredRecipes} />
    </main>
  );
}

export default Recipes;