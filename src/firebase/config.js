// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU29UjtpDPAu_wPvxMUXlNVP4PIfgQ8EQ",
  authDomain: "chat-app-9ae94.firebaseapp.com",
  projectId: "chat-app-9ae94",
  storageBucket: "chat-app-9ae94.appspot.com",
  messagingSenderId: "283264301107",
  appId: "1:283264301107:web:ae9d05cf86affd37908b46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// yetkilendirmeyi aktif eder
export const auth = getAuth(app);

// google yetkilendirmesi için kurulum
export const provider = new GoogleAuthProvider();

// veritabanının referansını oluşturma
export const db = getFirestore(app);
