import API from "../api/axios";

// Get all recipes
export const getRecipes = async () => {
  const response = await API.get("/recipes");
  return response.data;
};

// Get single recipe
export const getRecipeById = async (id) => {
  const response = await API.get(`/recipes/${id}`);
  return response.data;
};

// Add new recipe - Admin only
export const createRecipe = async (recipeData) => {
  const response = await API.post(
    "/recipes",
    recipeData
  );

  return response.data;
};

// Delete recipe - Admin only
export const deleteRecipe = async (id) => {
  const response = await API.delete(
    `/recipes/${id}`
  );

  return response.data;
};

// Update recipe - Admin only
export const updateRecipe = async (
  id,
  recipeData
) => {
  const response = await API.put(
    `/recipes/${id}`,
    recipeData
  );

  return response.data;
};