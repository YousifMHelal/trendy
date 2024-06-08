// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "trendy-424614.firebaseapp.com",
  projectId: "trendy-424614",
  storageBucket: "trendy-424614.appspot.com",
  messagingSenderId: "632910274830",
  appId: "1:632910274830:web:a0dfae235b04e15691b75f",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
