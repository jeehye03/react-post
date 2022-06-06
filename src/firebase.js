import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiL8tVtSxLKPOFrPfKfRM0j2PjO0wxZTQ",
  authDomain: "authex-79cda.firebaseapp.com",
  projectId: "authex-79cda",
  storageBucket: "authex-79cda.appspot.com",
  messagingSenderId: "601562833111",
  appId: "1:601562833111:web:936edc5a3f102fccedd092",
  measurementId: "G-2553GHV98B",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
