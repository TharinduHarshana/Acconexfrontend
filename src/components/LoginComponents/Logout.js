// // useLogout.js
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const useLogout = () => {
//  const navigate = useNavigate();

//  const logout = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/user/logout', {
//         withCredentials: true,
//       });

//       if (response.data.message === 'Logged out successfully') {
//         console.log('Logout successful');
//         localStorage.removeItem('token');
//         navigate('/admin'); // Adjust the path as needed
//       } else {
//         console.error('Logout failed');
//       }
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//  };

//  return logout;
// };

// export default useLogout;

// useLogout.js
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useLogout = () => {
 const navigate = useNavigate();

 const logout = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/logout', {
        withCredentials: true,
      });

      if (response.data.message === 'Logged out successfully') {
        console.log('Logout successful');
        navigate('/admin'); // Adjust the path as needed
        //window.location.reload();
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
 };

 return logout;
};

export default useLogout;

