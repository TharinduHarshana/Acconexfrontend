import axios from "axios";

// Create an axios instance with baseURL and withCredentials
const api = axios.create({
  baseURL: "http://user/switch-profile", 
  withCredentials: true, 
});

// Function to switch profile
export const switchProfile = async (newRole) => {
  try {
    const response = await api.post("/", { newRole }); // Use the created instance `api`
    return response.data;
  } catch (error) {
    console.error("Failed to switch profile:", error);
    throw error;
  }
};

export default api; // Export the axios instance
