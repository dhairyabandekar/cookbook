import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipe.service";

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch recipe from MongoDB
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getRecipeById(id);

        if (data.success) {
          setRecipe(data.recipe);
        } else {
          setError("Recipe not found");
        }
      } catch (error) {
        console.error("Failed to fetch recipe:", error);

        if (error.response?.status === 404) {
          setError("Recipe not found");
        } else {
          setError("Unable to load recipe.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-xl font-semibold text-orange-500">
          Loading recipe...
        </p>
      </main>
    );
  }

  // Recipe not found / error
  if (!recipe || error) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {error || "Recipe Not Found"}
          </h2>

          <Link
            to="/recipes"
            className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
          >
            Back to Recipes
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 px-4 sm:px-6 lg:px-8 py-10">

      <div className="max-w-7xl mx-auto">

        <Link
          to="/recipes"
          className="inline-block mb-8 text-orange-600 font-semibold hover:underline"
        >
          ← Back to Recipes
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">

          <img
            src={recipe.image}
            alt={recipe.name}
            className="rounded-2xl shadow-lg w-full h-112.5 object-cover"
          />

          <div>

            <h1 className="text-4xl font-bold">
              {recipe.name}
            </h1>

            <div className="flex flex-wrap gap-3 mt-5">

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
                {recipe.diet}
              </span>

              <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
                {recipe.cuisine}
              </span>

              <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                {recipe.course}
              </span>

            </div>

            <div className="mt-6 space-y-2 text-lg">

              <p>
                ⏱ <strong>Cooking Time:</strong>{" "}
                {recipe.time} mins
              </p>

              <p>
                ⭐ <strong>Difficulty:</strong>{" "}
                {recipe.difficulty}
              </p>

            </div>

            <h2 className="text-2xl font-bold mt-8">
              Description
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              {recipe.description}
            </p>

            {recipe.youtube && (
              <a
                href={recipe.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
              >
                ▶ Watch Full Recipe
              </a>
            )}

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-10 mt-14">

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Ingredients
            </h2>

            <ul className="space-y-3">

              {recipe.ingredients?.map((ingredient, index) => (
                <li
                  key={index}
                  className="bg-orange-50 p-3 rounded-lg"
                >
                  ✅ {ingredient}
                </li>
              ))}

            </ul>

          </div>

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Cooking Steps
            </h2>

            <ol className="space-y-4">

              {recipe.steps?.map((step, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-4 rounded-lg"
                >
                  <strong>Step {index + 1}</strong>

                  <p className="mt-2">
                    {step}
                  </p>

                </li>
              ))}

            </ol>

          </div>

        </div>

      </div>

    </main>
  );
}

export default RecipeDetails;