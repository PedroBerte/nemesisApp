import React, { createContext, useState, useContext, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  deleteUser,
} from "firebase/auth";
import { auth, db } from "../services/firebase-config";
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { Alert } from "react-native";

export const AuthContext = createContext({});

function AuthContextProvider(props) {
  const [user, setUser] = useState("idle");
  const [animationIsEnded, setAnimationIsEnded] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user != "idle" && user != null) {
      async function verifyUserDocs() {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        const userWorkouts = await getDoc(doc(db, "workouts", user.uid));
        const userDiet = await getDoc(doc(db, "diets", user.uid));
        if (
          userDocs.data().name == undefined ||
          userWorkouts.data().workouts == undefined ||
          userDiet.data().diet == undefined
        ) {
          Alert.alert(
            "Epa, temos algum problema! 🤔",
            "Existe um problema interno com sua conta, por favor, crie uma nova conta ou entre em contato com o desenvolvedor.",
            [
              {
                text: "Excluir conta",
                onPress: () => handleDeleteBrokenUser(),
              },
              {
                text: "Ok",
                onPress: () => logout(),
              },
            ]
          );
        }
      }
      verifyUserDocs();
    }
  }, [user]);

  function logout() {
    setUser();
    setAnimationIsEnded(false);
    signOut(auth);
  }

  async function handleDeleteBrokenUser() {
    const userDocs = await getDoc(doc(db, "users", user.uid));
    const userWorkouts = await getDoc(doc(db, "workouts", user.uid));
    const userDiet = await getDoc(doc(db, "diets", user.uid));
    const uid = user.uid;
    await deleteUser(auth.currentUser)
      .then(() => {
        if (userDocs.exists()) {
          deleteDoc(doc(db, "users", uid));
        }
        if (userWorkouts.exists()) {
          deleteDoc(doc(db, "workouts", uid));
        }
        if (userDiet.exists()) {
          deleteDoc(doc(db, "diets", uid));
        }
        logout();
        setTimeout(() => {
          () => navigation.navigate("Login");
        }, 1500);
      })
      .catch((error) => {
        console.warn(error);
      });
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
