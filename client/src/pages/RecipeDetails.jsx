import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipe.service";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ======================================================
  // TEMPORARY SUBSCRIPTION ACCESS
  // ======================================================
  // These will later come from the logged-in user's
  // subscription returned by the backend.

  const [hasReadAccess, setHasReadAccess] = useState(false);
  const [hasWatchAccess, setHasWatchAccess] = useState(false);

  // ======================================================
  // SUBSCRIPTION POPUP
  // ======================================================

  const [showSubscribePopup, setShowSubscribePopup] =
    useState(false);

  // ======================================================
  // FETCH RECIPE
  // ======================================================

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

  // ======================================================
  // LOADING
  // ======================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-xl font-semibold text-orange-500">
          Loading recipe...
        </p>
      </main>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================

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

  // ======================================================
  // WATCH RECIPE
  // ======================================================

  const handleWatchRecipe = () => {
    if (!hasWatchAccess) {
      setShowSubscribePopup(true);
      return;
    }

    if (recipe.youtube) {
      window.open(
        recipe.youtube,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  // ======================================================
  // SUBSCRIBE
  // ======================================================

  const handleSubscribe = () => {
    setShowSubscribePopup(false);
    navigate("/subscription");
  };

  // ======================================================
  // STEPS
  // ======================================================

  const steps = recipe.steps || [];

  const visibleSteps = hasReadAccess
    ? steps
    : steps.slice(0, 3);

  const lockedSteps = hasReadAccess
    ? []
    : steps.slice(3);

  return (
    <main className="min-h-screen bg-orange-50 px-4 sm:px-6 lg:px-8 py-10">

      <div className="max-w-7xl mx-auto">

        {/* ==================================================
            BACK
        ================================================== */}

        <Link
          to="/recipes"
          className="inline-block mb-8 text-orange-600 font-semibold hover:underline"
        >
          ← Back to Recipes
        </Link>

        {/* ==================================================
            TOP SECTION
        ================================================== */}

        <div className="grid lg:grid-cols-2 gap-10">

          {/* IMAGE */}

          <img
            src={recipe.image}
            alt={recipe.name}
            className="rounded-2xl shadow-lg w-full h-112.5 object-cover"
          />

          {/* DETAILS */}

          <div>

            <h1 className="text-4xl font-bold">
              {recipe.name}
            </h1>

            {/* TAGS */}

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

            {/* INFO */}

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

            {/* DESCRIPTION */}

            <h2 className="text-2xl font-bold mt-8">
              Description
            </h2>

            <p className="mt-3 text-gray-700 leading-7">
              {recipe.description}
            </p>

            {/* ==================================================
                VIDEO + SUBSCRIBE BUTTONS
            ================================================== */}

            <div className="flex flex-wrap gap-3 mt-8">

              {/* WATCH */}

              {recipe.youtube && (
                <button
                  onClick={handleWatchRecipe}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-semibold"
                >
                  ▶ Watch Full Recipe
                </button>
              )}

              {/* SUBSCRIBE */}

              {!hasWatchAccess && (
                <button
                  onClick={() => setShowSubscribePopup(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition font-semibold"
                >
                  ⭐ Subscribe Now
                </button>
              )}

            </div>

          </div>

        </div>

        {/* ==================================================
            INGREDIENTS + STEPS
        ================================================== */}

        <div className="grid lg:grid-cols-2 gap-10 mt-14">

          {/* ==================================================
              INGREDIENTS
          ================================================== */}

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Ingredients
            </h2>

            <ul className="space-y-3">

              {recipe.ingredients?.map(
                (ingredient, index) => (
                  <li
                    key={index}
                    className="bg-white p-3 rounded-lg shadow-sm"
                  >
                    ✅ {ingredient}
                  </li>
                )
              )}

            </ul>

          </div>

          {/* ==================================================
              COOKING STEPS
          ================================================== */}

          <div>

            <h2 className="text-2xl font-bold mb-5">
              Cooking Steps
            </h2>

            {/* VISIBLE STEPS */}

            <ol className="space-y-4">

              {visibleSteps.map((step, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm"
                >

                  <strong>
                    Step {index + 1}
                  </strong>

                  <p className="mt-2 text-gray-700">
                    {step}
                  </p>

                </li>
              ))}

            </ol>

            {/* ==================================================
                LOCKED STEPS
            ================================================== */}

            {lockedSteps.length > 0 && (
              <div className="relative mt-4">

                {/* BLURRED STEPS */}

                <div className="space-y-4 max-h-80 overflow-hidden">

                  {lockedSteps.map(
                    (step, index) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm blur-sm select-none"
                      >

                        <strong>
                          Step {index + 4}
                        </strong>

                        <p className="mt-2">
                          {step}
                        </p>

                      </div>
                    )
                  )}

                </div>

                {/* GRADIENT */}

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-orange-50 to-transparent pointer-events-none" />

              </div>
            )}

            {/* ==================================================
                READ MORE
            ================================================== */}

            {!hasReadAccess && lockedSteps.length > 0 && (
              <div className="text-center mt-6">

                <button
                  onClick={() =>
                    setShowSubscribePopup(true)
                  }
                  className="text-orange-600 font-bold hover:text-orange-700 hover:underline"
                >
                  Read More →
                </button>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* ======================================================
          SUBSCRIPTION POPUP
      ====================================================== */}

      {showSubscribePopup && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() =>
            setShowSubscribePopup(false)
          }
        >

          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >

            {/* ICON */}

            <div className="text-5xl mb-4">
              🔒
            </div>

            {/* TITLE */}

            <h2 className="text-2xl font-bold text-gray-800">
              Subscribe to Continue
            </h2>

            {/* MESSAGE */}

            <p className="text-gray-600 mt-4 leading-6">
              Subscribe to unlock the complete recipe
              and enjoy premium Cook Book features.
            </p>

            {/* SUBSCRIBE */}

            <button
              onClick={handleSubscribe}
              className="w-full mt-7 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Subscribe Now
            </button>

            {/* CANCEL */}

            <button
              onClick={() =>
                setShowSubscribePopup(false)
              }
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Maybe Later
            </button>

          </div>

        </div>
      )}

    </main>
  );
}

export default RecipeDetails;