import API from "../api/axios";

export const getRecipes = async () => {
  const response = await API.get("/recipes");
  return response.data;
};

export const getRecipeById = async (id) => {
  const response = await API.get(`/recipes/${id}`);
  return response.data;
};