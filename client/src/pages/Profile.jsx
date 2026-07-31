import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import { FavoritesContext } from "../context/FavoritesContext";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const { favorites } = useContext(FavoritesContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">

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

          {/* Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-4">

            <Link
              to="/favorites"
              className="flex-1 bg-orange-500 text-white text-center py-3 rounded-xl font-semibold hover:bg-orange-600 transition"
            >
              View Favourite Recipes
            </Link>

            <button
              onClick={handleLogout}
              className="flex-1 bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>

          </div>

        </div>

      </section>
    </div>
  );
}

export default Profile;