import { Link } from "react-router-dom";
import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";

function RecipeCard({ recipe }) {
  const { user } = useContext(AuthContext);

  const {
    toggleFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <div className="relative bg-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition duration-300 overflow-hidden cursor-pointer">

        {user && (
          <button
            onClick={(e) => {
              e.preventDefault();
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

        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-52 object-cover"
        />

        <div className="p-4">
          <h2 className="text-xl font-bold">
            {recipe.name}
          </h2>

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

          <p className="mt-4">⏱ {recipe.time} mins</p>

          <p>⭐ {recipe.difficulty}</p>

          <button
            onClick={(e) => {
              e.preventDefault();
              window.open(recipe.youtube, "_blank");
            }}
            className="inline-block mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            ▶ Watch Recipe
          </button>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;