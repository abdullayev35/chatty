import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALULjuAmNf6UZEApn8o1BqziYZ0P9_MwY",
  authDomain: "chatty-c1ac1.firebaseapp.com",
  projectId: "chatty-c1ac1",
  storageBucket: "chatty-c1ac1.appspot.com",
  messagingSenderId: "206309453788",
  appId: "1:206309453788:web:65983d7c32faff93b7a919",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
