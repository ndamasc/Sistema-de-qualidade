import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
//import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJIBeIqMl30ddbqlYH2pfXS3E-tIEsmBA",
  authDomain: "sistema-inteligente-agua.firebaseapp.com",
  projectId: "sistema-inteligente-agua",
  storageBucket: "sistema-inteligente-agua.appspot.com",
  messagingSenderId: "707719612220",
  appId: "1:707719612220:web:587efe4a657200fcd30039"
};

export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
//export const firestore = getAuth(firebase_app);