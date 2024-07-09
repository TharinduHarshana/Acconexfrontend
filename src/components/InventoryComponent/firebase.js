
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import{getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHSJwXPdilLLJ1eQpBOuexKYaEaQ1dDSw",
  authDomain: "acconexcomputerphotogallery.firebaseapp.com",
  projectId: "acconexcomputerphotogallery",
  storageBucket: "acconexcomputerphotogallery.appspot.com",
  messagingSenderId: "405309105916",
  appId: "1:405309105916:web:235c70c2f9885ac3dfd979"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;