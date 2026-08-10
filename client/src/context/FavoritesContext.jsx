import { createContext, useEffect, useState } from "react";
import {
  getFavorites,
  toggleFavorite as toggleFavoriteAPI,
} from "../services/favorite.service";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // ==========================================
  // Load Favorites
  // ==========================================

  const loadFavorites = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFavorites([]);
      return;
    }

    try {
      const data = await getFavorites();

      if (data.success) {
        setFavorites(data.favorites || []);
      }
    } catch (error) {
      console.error(
        "Failed to load favorites:",
        error
      );
    }
  };

  // ==========================================
  // Load favorites on app start
  // ==========================================

  useEffect(() => {
    loadFavorites();
  }, []);

  // ==========================================
  // Check Favorite
  // ==========================================

  const isFavorite = (recipeId) => {
    return favorites.some(
      (id) => String(id) === String(recipeId)
    );
  };

  // ==========================================
  // Toggle Favorite
  // ==========================================

  const toggleFavorite = async (recipeId) => {
    try {
      const data = await toggleFavoriteAPI(recipeId);

      if (data.success) {
        setFavorites(data.favorites || []);
      }
    } catch (error) {
      console.error(
        "Failed to update favorite:",
        error
      );
    }
  };

  // ==========================================
  // Remove Favorite
  // Used when admin deletes a recipe
  // ==========================================

  const removeFavorite = (recipeId) => {
    setFavorites((prev) =>
      prev.filter(
        (id) => String(id) !== String(recipeId)
      )
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        loadFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};