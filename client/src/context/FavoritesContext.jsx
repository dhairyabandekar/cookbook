import { createContext, useEffect, useState } from "react";
import {
  getFavorites,
  toggleFavorite as toggleFavoriteAPI,
} from "../services/favorite.service";

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setFavorites([]);
      return;
    }

    try {
      const data = await getFavorites();

      if (data.success) {
        setFavorites(data.favorites);
      }
    } catch (error) {
      console.error("Failed to load favorites:", error);
    }
  };

  useEffect(() => {
    loadFavorites();
  }, []);

  const isFavorite = (recipeId) => {
    return favorites.includes(recipeId);
  };

  const toggleFavorite = async (recipeId) => {
    try {
      const data = await toggleFavoriteAPI(recipeId);

      if (data.success) {
        setFavorites(data.favorites);
      }
    } catch (error) {
      console.error("Failed to update favorite:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        loadFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};