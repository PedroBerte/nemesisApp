import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";

import { useAuthContext } from "../../context/AuthContext";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import styles from "./WorkoutsStyles";

export default function Workouts() {
  const { user } = useAuthContext();

  const [userWorkouts, setUserWorkouts] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    async function getUserDocs() {
      if (user != undefined) {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        setUserWorkouts(userDocs.data().workouts);
      }
    }
    getUserDocs();
  }, [user]);

  return (
    <>
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.title}>Treinos</Text>
        <View style={styles.workoutSelectorBody}>
          {/* {userWorkouts.map((workouts) => {
            return (
              <View>
                <Text>{workouts.name}</Text>
              </View>
            );
          })} */}
          <View style={styles.borderLine}></View>
        </View>
      </View>
      <TabBar />
    </>
  );
}
