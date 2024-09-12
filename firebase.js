import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "netflix-clone-c53a0.firebaseapp.com",
  projectId: "netflix-clone-c53a0",
  storageBucket: "netflix-clone-c53a0.appspot.com",
  messagingSenderId: "386920474529",
  appId: "1:386920474529:web:c3b6b4b1396f73ea8ccde0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local",
    });
  } catch (error) {
    console.log(error);
    // alert(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    // alert(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
