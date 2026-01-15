// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQjwHQibuf0xvSprMtiww2zJoZHG7yQQI",
    authDomain: "nivika-dd36a.firebaseapp.com",
    projectId: "nivika-dd36a",
    storageBucket: "nivika-dd36a.firebasestorage.app",
    messagingSenderId: "540156654541",
    appId: "1:540156654541:web:0b32785c6356d02e2e4a84",
    measurementId: "G-DY9332D7MM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const analytics = getAnalytics(app);
