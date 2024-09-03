// useLogout.js
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define the useLogout custom hook
const useLogout = () => {
  const navigate = useNavigate();

  // Define async function to handle logout
  const logout = async () => {
    try {
      const response = await axios.get("https://acconex-backend.vercel.app/user/logout", {
        // Make a GET request to the logout endpoint
        withCredentials: true, // Include credentials in the request
      });
      // Check if the response message indicates successful logout
      if (response.data.message === "Logged out successfully") {
        console.log("Logout successful");
        // Navigate to the admin page
        navigate("/admin");
        //window.location.reload();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  // Return the logout function from the hook
  return logout;
};
// Export the useLogout hook
export default useLogout;
