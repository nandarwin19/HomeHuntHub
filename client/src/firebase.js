// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-fd2cf.firebaseapp.com",
  projectId: "mern-estate-fd2cf",
  storageBucket: "mern-estate-fd2cf.appspot.com",
  messagingSenderId: "252668656437",
  appId: "1:252668656437:web:369c2ca86ba51209e5aa7c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
