// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "clinica-app-bed6c.firebaseapp.com",
  projectId: "clinica-app-bed6c",
  storageBucket: "clinica-app-bed6c.appspot.com",
  messagingSenderId: "192693944997",
  appId: "1:192693944997:web:a39be031a8c42b9cac034c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);