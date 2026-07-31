import { Link, useParams } from "react-router-dom";
import recipes from "../data/recipes";

function RecipeDetails() {
  const { id } = useParams();

  const recipe = recipes.find(
    (recipe) => recipe.id === Number(id)
  );

  if (!recipe) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold">
          Recipe Not Found
        </h2>

        <Link
          to="/recipes"
          className="mt-6 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg"
        >
          Back to Recipes
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">

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
              ⏱ <strong>Cooking Time:</strong> {recipe.time} mins
            </p>

            <p>
              ⭐ <strong>Difficulty:</strong> {recipe.difficulty}
            </p>

          </div>

          <h2 className="text-2xl font-bold mt-8">
            Description
          </h2>

          <p className="mt-3 text-gray-700 leading-7">
            {recipe.description}
          </p>

          <a
            href={recipe.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
          >
            ▶ Watch Full Recipe
          </a>

        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-10 mt-14">

        <div>

          <h2 className="text-2xl font-bold mb-5">
            Ingredients
          </h2>

          <ul className="space-y-3">

            {recipe.ingredients.map((ingredient, index) => (

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

            {recipe.steps.map((step, index) => (

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

    </main>
  );
}

export default RecipeDetails;