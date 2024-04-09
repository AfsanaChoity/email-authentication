// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpPLcwJD9PSBDjAlz-4PB3XyJpav200Oo",
  authDomain: "email-auth-be867.firebaseapp.com",
  projectId: "email-auth-be867",
  storageBucket: "email-auth-be867.appspot.com",
  messagingSenderId: "942552539712",
  appId: "1:942552539712:web:1175d2ce3fe0006afb75a5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);


export default auth;