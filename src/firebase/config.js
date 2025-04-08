// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6BxIA9A9eBd7PdkHKlyvE3RnHd9bfmTc",
  authDomain: "auth-app-9d85f.firebaseapp.com",
  projectId: "auth-app-9d85f",
  storageBucket: "auth-app-9d85f.appspot.com",
  messagingSenderId: "583234124766",
  appId: "1:583234124766:web:4dc88f6cb6b143f3b83b4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize auth from authentication 
export const auth = getAuth(app);