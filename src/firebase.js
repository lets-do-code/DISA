// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBfn7Mh73uvnLAwxJdlgrto9UENhWPdCOs",
  authDomain: "disaster-44636.firebaseapp.com",
  projectId: "disaster-44636",
  storageBucket: "disaster-44636.appspot.com",
  messagingSenderId: "450837038001",
  appId: "1:450837038001:web:d27bc927ea0aa04867f390",
  measurementId: "G-EXE2HWDHBZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
