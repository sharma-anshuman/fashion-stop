// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import {getAuth} from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhGCZObKcvbPKNWyY9SmTOAulLqK87UbM",
  authDomain: "fashion-stop-22908.firebaseapp.com",
  projectId: "fashion-stop-22908",
  storageBucket: "fashion-stop-22908.appspot.com",
  messagingSenderId: "206518955196",
  appId: "1:206518955196:web:10ce8ee0dd79912295b4b9",
  measurementId: "G-Z9T024MNNW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

export const db = getFirestore(app);