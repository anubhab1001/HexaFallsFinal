// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF-7rY0sRrMdHNolsXrN6BFfdaXkRW_Pc",
  authDomain: "safebite-8ee33.firebaseapp.com",
  projectId: "safebite-8ee33",
  storageBucket: "safebite-8ee33.firebasestorage.app",
  messagingSenderId: "1081389825529",
  appId: "1:1081389825529:web:2fe2579ed198f6a42c5128",
  measurementId: "G-74JV488TXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app); // Initialize Firestore
export const auth = getAuth(app);
