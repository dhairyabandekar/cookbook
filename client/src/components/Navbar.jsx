import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { FaHeart, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-orange-500 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="text-2xl sm:text-3xl font-bold"
        >
          🍳 Cook Book
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg font-medium">

          <Link to="/">Home</Link>

          <Link to="/recipes">Recipes</Link>

          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>

          {!user ? (
            <Link
              to="/login"
              className="bg-white text-orange-500 px-4 py-2 rounded-lg font-semibold"
            >
              Login
            </Link>
          ) : (
            <>
              <Link to="/favorites">
                Favorites
              </Link>

              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-orange-100 transition"
              >
                <FaUserCircle size={35} />
          
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-orange-600 px-4 pb-4">

          <Link
            to="/"
            onClick={closeMenu}
            className="block py-3"
          >
            Home
          </Link>

          <Link
            to="/recipes"
            onClick={closeMenu}
            className="block py-3"
          >
            Recipes
          </Link>

          <Link
            to="/about"
            onClick={closeMenu}
            className="block py-3"
          >
            About
          </Link>

          <Link
            to="/contact"
            onClick={closeMenu}
            className="block py-3"
          >
            Contact
          </Link>

          {!user ? (
            <Link
              to="/login"
              onClick={closeMenu}
              className="block py-3"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                to="/favorites"
                onClick={closeMenu}
                className="block py-3"
              >
                Favorites
              </Link>
              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center gap-2 py-3"
              >
                <FaUserCircle size={20} />
                Profile
              </Link>
            </>
          )}

        </div>
      )}
    </nav>
  );
}

export default Navbar;