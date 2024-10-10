// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "ai-course-generator-95f8b.firebaseapp.com",
    projectId: "ai-course-generator-95f8b",
    storageBucket: "ai-course-generator-95f8b.appspot.com",
    messagingSenderId: "559196385630",
    appId: "1:559196385630:web:e54b721c210f1830935fcf",
    measurementId: "G-R3CF1YBXPY"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)