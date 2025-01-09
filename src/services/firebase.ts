import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  confirmPasswordReset
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDU95mBEwswXTrehr6-awwFxPNMOqnEscM",
    authDomain: "peak-suprstate-384109.firebaseapp.com",
    projectId: "peak-suprstate-384109",
    storageBucket: "peak-suprstate-384109.appspot.com",
    messagingSenderId: "764256186835",
    appId: "1:764256186835:web:ecdecc4c9b5bd4bb1e7f26",
    measurementId: "G-QG56KL9Y1R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  collection,
  onSnapshot,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  confirmPasswordReset
};