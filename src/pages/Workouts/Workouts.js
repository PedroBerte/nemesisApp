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

  const [userWorkouts, setUserWorkouts] = useState([]);
  const [workoutIndex, setWorkoutIndex] = useState(0);

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
  useEffect(() => {
    console.warn(workoutIndex);
  }, [workoutIndex]);

  return (
    <>
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.title}>Treinos</Text>
        <View style={styles.workoutSelectorBody}>
          {userWorkouts != [] ? (
            <>
              <View style={styles.workoutMenu}>
                {userWorkouts.map((workouts, i) => {
                  return (
                    <Text onPress={() => setWorkoutIndex(i)}>
                      {workouts.name}
                    </Text>
                  );
                })}
              </View>
              <View style={styles.borderLine}></View>
              <View style={styles.workoutListBody}>
                <View style={styles.workoutListHeader}>
                  <Text>
                    {userWorkouts.map((workouts, i) => {
                      return workouts.muscles[i] == workoutIndex;
                    })}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text>oi</Text>
          )}
        </View>
      </View>
      <TabBar />
    </>
  );
}
