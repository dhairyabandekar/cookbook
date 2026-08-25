import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";

function RecipeCard({ recipe }) {
  const { user } = useContext(AuthContext);

  const {
    toggleFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  const navigate = useNavigate();

  // ======================================================
  // TEMPORARY SUBSCRIPTION ACCESS
  // ======================================================

  const [hasWatchAccess, setHasWatchAccess] =
    useState(false);

  // ======================================================
  // SUBSCRIBE POPUP
  // ======================================================

  const [showSubscribePopup, setShowSubscribePopup] =
    useState(false);

  // ======================================================
  // WATCH RECIPE
  // ======================================================

  const handleWatchRecipe = (e) => {
    e.preventDefault();
    e.stopPropagation();

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

  const handleSubscribe = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setShowSubscribePopup(false);

    navigate("/subscription");
  };

  return (
    <>
      <Link to={`/recipe/${recipe.id}`}>

        <div className="relative bg-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition duration-300 overflow-hidden cursor-pointer">

          {/* ==================================================
              FAVORITE
          ================================================== */}

          {user && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                toggleFavorite(recipe.id);
              }}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:scale-110 transition z-10"
            >
              {isFavorite(recipe.id) ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-gray-500 text-xl" />
              )}
            </button>
          )}

          {/* ==================================================
              IMAGE
          ================================================== */}

          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-52 object-cover"
          />

          {/* ==================================================
              CONTENT
          ================================================== */}

          <div className="p-4">

            <h2 className="text-xl font-bold">
              {recipe.name}
            </h2>

            {/* TAGS */}

            <div className="flex flex-wrap gap-2 mt-3">

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                {recipe.diet}
              </span>

              <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                {recipe.cuisine}
              </span>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {recipe.course}
              </span>

            </div>

            {/* INFO */}

            <p className="mt-4">
              ⏱ {recipe.time} mins
            </p>

            <p>
              ⭐ {recipe.difficulty}
            </p>

            {/* ==================================================
                ACTION BUTTONS
            ================================================== */}

            <div className="flex flex-wrap gap-2 mt-4">

              {/* WATCH RECIPE */}

              {recipe.youtube && (
                <button
                  onClick={handleWatchRecipe}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold"
                >
                  ▶ Watch Recipe
                </button>
              )}

              {/* SUBSCRIBE NOW */}

              {!hasWatchAccess && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    setShowSubscribePopup(true);
                  }}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                >
                  ⭐ Subscribe Now
                </button>
              )}

            </div>

          </div>

        </div>

      </Link>

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
              Subscribe to Watch Recipe
            </h2>

            {/* DESCRIPTION */}

            <p className="text-gray-600 mt-4 leading-6">
              Subscribe to the Read + Watch plan to
              unlock video tutorials for all recipes.
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
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                setShowSubscribePopup(false);
              }}
              className="mt-4 text-gray-500 hover:text-gray-700"
            >
              Maybe Later
            </button>

          </div>

        </div>
      )}

    </>
  );
}

export default RecipeCard;