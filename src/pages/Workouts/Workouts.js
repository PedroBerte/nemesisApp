import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";

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
import { WorkoutBox } from "../../components/WorkoutBox/WorkoutBox";

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
  return (
    <>
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.title}>Treinos</Text>
        <View style={styles.workoutSelectorBody}>
          {userWorkouts != undefined ? (
            <>
              <View style={styles.workoutMenu}>
                {userWorkouts.map((workouts, i) => {
                  return (
                    <Text
                      onPress={() => setWorkoutIndex(i)}
                      style={
                        workoutIndex == i ? styles.active : styles.inactive
                      }
                    >
                      {workouts.name}
                    </Text>
                  );
                })}
              </View>
              <View style={styles.borderLine}></View>
              <View style={styles.workoutListBody}>
                <View style={styles.workoutListHeader}>
                  {userWorkouts[workoutIndex] != undefined ? (
                    <>
                      <Text>{userWorkouts[workoutIndex].muscles}</Text>
                    </>
                  ) : (
                    <Text>skeleton</Text>
                  )}
                </View>
                <View style={styles.borderLine}></View>
                <ScrollView style={styles.workoutsSelector}>
                  {userWorkouts[workoutIndex] != undefined ? (
                    <>
                      {userWorkouts[workoutIndex].workoutsInfos.map(
                        (workouts, i) => {
                          return (
                            <WorkoutBox key={i} rep={workouts.rep}>
                              {workouts.name}
                            </WorkoutBox>
                          );
                        }
                      )}
                    </>
                  ) : (
                    <Text>skeleton</Text>
                  )}
                </ScrollView>
              </View>
            </>
          ) : (
            <Text>Carregando</Text>
          )}
        </View>
      </View>
      <TabBar />
    </>
  );
}
