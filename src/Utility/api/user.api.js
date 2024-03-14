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

function getUsers() {
  return axios.get("http://localhost:8000/user/");
}

export { user, getUsers,login };
