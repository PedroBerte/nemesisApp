import React, { createContext, useState, useContext, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, db } from "../services/firebase-config";

export const AuthContext = createContext({});

function AuthContextProvider(props) {
  const [user, setUser] = useState("");
  const [animationIsEnded, setAnimationIsEnded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, [user]);

  function logout() {
    setUser();
    setAnimationIsEnded(false);
    signOut(auth);
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useContext must be used within a AuthContextProvider");
  }
  return context;
}

export default AuthContextProvider;
