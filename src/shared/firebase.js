import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCE98NYeHvC4rVzvvsk5rUDSHUU8aZyRwE",
  authDomain: "react-board-af319.firebaseapp.com",
  projectId: "react-board-af319",
  storageBucket: "react-board-af319.appspot.com",
  messagingSenderId: "417985161357",
  appId: "1:417985161357:web:686961d953e0ab7f275ac4",
  measurementId: "G-0J7CJ7D78Q",
};

firebase.initializeApp(firebaseConfig);

const apiKey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();

export{auth, apiKey, firestore, storage};