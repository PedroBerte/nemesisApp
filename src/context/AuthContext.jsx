import React, { createContext, useState, useContext, useEffect } from "react";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../services/firebase-config";

export const AuthContext = createContext({});

function AuthContextProvider(props) {
  const [user, setUser] = useState("");
  const [animationIsEnded, setAnimationIsEnded] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  function logout() {
    setUser();
    setAnimationIsEnded(false);
  }

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
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        animationIsEnded,
        setAnimationIsEnded,
        logout,
        step,
        setStep,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
