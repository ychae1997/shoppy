import { UserCallback } from "./../types/authTypes";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

// -- Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID
};

const app = initializeApp(firebaseConfig);

// -- Auth with Google
const auth = getAuth();
const provider = new GoogleAuthProvider();

// -- signInWithPopup() 호출
export function login() {
  signInWithPopup(auth, provider).catch(error => console.log(error));
}

export function logout() {
  signOut(auth).catch(error => console.log(error));
}

export async function onUserStateChange(callback: UserCallback) {
  onAuthStateChanged(auth, user => {
    callback(user);
  });
}
