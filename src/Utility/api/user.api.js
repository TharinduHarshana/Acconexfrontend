import axios from "axios";

async function user(
  userId,
  userName,
  firstName,
  lastName,
  password,
  gmail,
  dob,
  phoneNumber,
  address,
  idNumber,
  gender,
  role
) {
  return await axios.post("http://localhost:8000/user/add", {
    userId,
    userName,
    firstName,
    lastName,
    password,
    gmail,
    dob,
    phoneNumber,
    address,
    idNumber,
    gender,
    role,
  });
}

async function login({ userName, password }) {
  return await axios.post("http://localhost:8000/user/login", {
    userName,
    password,
  });
}

async function getUsers() {
  return await axios.get("http://localhost:8000/user/all/");
}


const updateUsers = async (_id, userData) => {
  try {
    const response = await axios.patch(`http://localhost:8000/user/update/${_id}`, userData);
    return response.data; // Return the updated user data
  } catch (error) {
    throw error; // Throw the error for handling in the component
  }
};
async function getUserById(id) {
  return await axios.get(`http://localhost:8000/user/${id}`);
}


async function deleteUser(_id) {
  try {
    const response = await axios.delete(
      `http://localhost:8000/user/delete/`+_id
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export { user, login,getUsers, updateUsers, deleteUser,getUserById};
