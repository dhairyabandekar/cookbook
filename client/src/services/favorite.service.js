const API_URL = `${import.meta.env.VITE_API_URL}/users`;
const getToken = () => localStorage.getItem("token");

export const getFavorites = async () => {
  console.log("GET Token:", getToken());

  const response = await fetch(`${API_URL}/favorites`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  console.log("GET Status:", response.status);

  return response.json();
};

export const toggleFavorite = async (recipeId) => {
  try {
    const response = await fetch(`${API_URL}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ recipeId }),
    });

    console.log("POST Status:", response.status);

    const data = await response.json();
    console.log("POST Data:", data);

    return data;
  } catch (error) {
    console.error("FETCH ERROR:", error);
    throw error;
  }
};