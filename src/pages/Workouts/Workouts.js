import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";

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
import WeekBox from "./WeekBox/WeekBox";

export default function Workouts() {
  const { user } = useAuthContext();

  const [userWorkouts, setUserWorkouts] = useState([]);
  const [workoutIndex, setWorkoutIndex] = useState(0);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const monthName = monthNames[new Date().getMonth()];
  const year = new Date().getFullYear();

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
          <View style={styles.workoutMenu}>
            {userWorkouts != undefined ? (
              <>
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
              </>
            ) : (
              <Text>skeleton</Text>
            )}
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
                          {i}
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
        </View>
        <View style={styles.workoutDaysBody}>
          <View style={styles.workoutDaysHeader}>
            <Text style={styles.dateMonthAndYear}>
              {monthName}, {year}
            </Text>
            <Image
              style={{ marginRight: 20 }}
              source={require("./../../assets/calendaryIcon.png")}
            />
          </View>
          <View style={styles.borderLine}></View>
          <View style={styles.workoutWeekList}>
            <WeekBox>Segunda-Feira</WeekBox>
            <WeekBox>Terça-Feira</WeekBox>
            <WeekBox>Quarta-Feira</WeekBox>
            <WeekBox>Quinta-Feira</WeekBox>
            <WeekBox>Sexta-Feira</WeekBox>
            <WeekBox>Sábado</WeekBox>
            <WeekBox>Domingo</WeekBox>
          </View>
        </View>
      </View>
      <TabBar />
    </>
  );
}
