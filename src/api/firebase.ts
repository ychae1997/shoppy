import { NullableUser, UserCallback } from "./../types/authTypes";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { v4 as uuid } from "uuid";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { ProductType } from "../types/productTypes";

// -- Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID
};

// initialize
const app = initializeApp(firebaseConfig);
// Auth with Google
const auth = getAuth();
const provider = new GoogleAuthProvider();
// database
const database = getDatabase(app);

// -- signInWithPopup() 호출
export function login() {
  signInWithPopup(auth, provider).catch(error => console.log(error));
}

export function logout() {
  signOut(auth).catch(error => console.log(error));
}

export async function onUserStateChange(callback: UserCallback) {
  onAuthStateChanged(auth, async user => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

// -- realtime database
async function adminUser(user: NullableUser) {
  const dbRef = ref(database);
  return get(child(dbRef, "admins")) //
    .then(snapshot => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      // return { ...user, isAdmin: false };
      return user;
    });
}

// -- add products
export async function addNewProduct(product: ProductType, image: string) {
  const id = uuid();
  return set(ref(database, `products/${uuid()}`), {
    ...product,
    id,
    price: +product.price,
    image,
    options: product.options.split(",")
  });
}
