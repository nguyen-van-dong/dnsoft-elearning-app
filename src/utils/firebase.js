import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBu687J8pfA6IbrXOf5m3a9QhbSOZ1FkWo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "dnsoft-platform-authentication.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "dnsoft-platform-authentication",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "dnsoft-platform-authentication.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "626212636289",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:626212636289:web:2b1376d6d6663a73a5af80"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signInWithSocial = async (provider) => {
  let authProvider;
  switch (provider) {
    case 'google':
      authProvider = new GoogleAuthProvider();
      break;
    case 'facebook':
      authProvider = new FacebookAuthProvider();
      break;
    default:
      authProvider = new GithubAuthProvider();
      break;
  }
  try {
    const res = await signInWithPopup(auth, authProvider);
    console.log({ res });
    return res.user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logoutSocial = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithSocial,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logoutSocial,
};
