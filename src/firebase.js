
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {getFirestore} from '@firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD5fTo9jdayVlYIK26fhi4iz0zTLk-k4pg",
  authDomain: "poleras-moni.firebaseapp.com",
  projectId: "poleras-moni",
  storageBucket: "poleras-moni.appspot.com",
  messagingSenderId: "100679018209",
  appId: "1:100679018209:web:33c9377d57816f90e979a0",
  measurementId: "G-VDDH3F4C8H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)