import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDQed1NaYVjSGUYYg8qJ9ZboR3NR7iQ_aw",
  authDomain: "planeandoando-856e6.firebaseapp.com",
  projectId: "planeandoando-856e6",
  storageBucket: "planeandoando-856e6.firebasestorage.app",
  messagingSenderId: "149072922907",
  appId: "1:149072922907:web:68221040dea95716dfabbe",
  measurementId: "G-HHZRMJG6ZD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };