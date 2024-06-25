// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8q6on-YhKcAwEsmIq8kUaaX7vRKSZvvY",
  authDomain: "netflixgpt-c0af4.firebaseapp.com",
  projectId: "netflixgpt-c0af4",
  storageBucket: "netflixgpt-c0af4.appspot.com",
  messagingSenderId: "411682697634",
  appId: "1:411682697634:web:d4684a8cab772f3c6902fb",
  measurementId: "G-ZDP9GL34M6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
