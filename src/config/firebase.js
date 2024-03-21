// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPpWMQfRlmyiwgJAUjIqdZ7ZJ9q8X1kcE",
  authDomain: "dataform-c3c03.firebaseapp.com",
  projectId: "dataform-c3c03",
  storageBucket: "dataform-c3c03.appspot.com",
  messagingSenderId: "425674793105",
  appId: "1:425674793105:web:140e6cf4103f454e809f30",
  measurementId: "G-74C7VSCVDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new  GoogleAuthProvider();

export {auth, provider};

