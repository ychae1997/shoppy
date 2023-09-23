import { NullableUser, UserCallback } from "./../types/authTypes";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
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
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: +product.price,
    image,
    options: Array.isArray(product.options)
      ? product.options
      : product.options.split(",")
  });
}

// -- get products
export async function getProducts(): Promise<ProductType[] | undefined> {
  const dbRef = ref(database);
  return get(child(dbRef, "products")) //
    .then(snapshot => {
      if (snapshot.exists()) {
        const products = Object.values(snapshot.val() as ProductType[]);
        return products;
      }
      return [];
    })
    .catch(error => {
      console.error("Error fetching products:", error);
      return undefined; // 에러가 발생하면 undefined 반환
    });
}

// -- get cart
export async function getCart(
  userId: string
): Promise<ProductType[] | undefined> {
  return get(ref(database, `carts/${userId}`)) //
    .then(snapshot => {
      const items = snapshot.val() || {};
      return Object.values(items);
    });
}

// -- updated cart
export async function addOrUpdatedCart(userId: string, product: ProductType) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
  // id가 같고 option이 같을 때 -> 저장을 product.id가 아니라 새로운 uuid 생성해야할듯
}

// -- delete cart
export async function deletedCart(userId: string, productId: string) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}
