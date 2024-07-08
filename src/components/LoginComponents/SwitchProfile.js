import axios from "axios";

// Create an axios instance with baseURL and withCredentials
const api = axios.create({
  baseURL: "http://localhost:8000/user",
  withCredentials: true,
});

export const switchProfile = async (userId, newRole) => {
  console.log("Switching profile for userId:", userId, "with newRole:", newRole);
  try {
    const response = await api.post("/switch-profile", { userId, newRole });
    console.log("Response from switch profile:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to switch profile:", error.response ? error.response.data : error.message);
    throw error;
  }
};

export default api;
