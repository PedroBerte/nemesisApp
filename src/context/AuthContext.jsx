import { createContext, useState, useContext, useEffect } from "react";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase-config";

export const AuthContext = createContext({});

function AuthContextProvider(props) {
  const [user, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const signIn = (email, password) => {
    if ((email, password == "")) {
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.error(error.code);
        console.error(error.message);
      });
  };
  return (
    <AuthContext.Provider value={{ user, setUser, signIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
