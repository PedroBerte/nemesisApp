import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";
import Skeleton from "../../components/Skeleton/Skeleton";
import { WorkoutBox } from "./WorkoutBox/WorkoutBox";
import WeekBox from "./WeekBox/WeekBox";
import LineSpace from "../../components/LineSpace/LineSpace";
import ModalChangeParameters from "../../components/ModalChangeParameters/ModalChangeParameters";

import { useAuthContext } from "../../context/AuthContext";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import styles from "./WorkoutsStyles";

export default function Workouts() {
  const { user } = useAuthContext();

  const [userWorkouts, setUserWorkouts] = useState([]);
  const [workoutIndex, setWorkoutIndex] = useState(0);

  const [changeModalIsVisible, setChangeModalIsVisible] = useState(false);

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
      <ModalChangeParameters
        get={changeModalIsVisible}
        set={setChangeModalIsVisible}
      />
      <TopBar />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Treinos</Text>
        <View style={styles.workoutSelectorBody}>
          <View style={styles.workoutMenu}>
            {userWorkouts != [] ? (
              <>
                {userWorkouts.map((workouts, i) => {
                  return (
                    <Text
                      key={i}
                      onPress={() => setWorkoutIndex(i)}
                      style={
                        workoutIndex == i ? styles.active : styles.inactive
                      }
                    >
                      {workouts.name == undefined ? (
                        <Skeleton
                          alignSelf="center"
                          width={60}
                          height={17}
                          borderRadius={10}
                          marginX={10}
                        />
                      ) : (
                        workouts.name
                      )}
                    </Text>
                  );
                })}
              </>
            ) : (
              <Skeleton
                width={350}
                height={40}
                borderRadius={10}
                marginX={10}
              />
            )}
          </View>

          <LineSpace lineWidth="80%" marginTop={-2} />

          <View style={styles.workoutListBody}>
            <View style={styles.workoutListHeader}>
              {userWorkouts[workoutIndex] != undefined ? (
                <>
                  <Text>{userWorkouts[workoutIndex].muscles}</Text>
                </>
              ) : (
                <Skeleton
                  alignSelf="center"
                  width={80}
                  height={15}
                  borderRadius={10}
                />
              )}
            </View>
            <LineSpace lineWidth="80%" />
            <ScrollView nestedScrollEnabled style={styles.workoutsSelector}>
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
                <>
                  <Skeleton
                    alignSelf="center"
                    width="90%"
                    height={45}
                    borderRadius={10}
                    marginX={10}
                  />
                  <Skeleton
                    alignSelf="center"
                    width="90%"
                    height={45}
                    borderRadius={10}
                    marginX={10}
                  />
                  <Skeleton
                    alignSelf="center"
                    width="90%"
                    height={45}
                    borderRadius={10}
                    marginX={10}
                  />
                  <Skeleton
                    alignSelf="center"
                    width="90%"
                    height={45}
                    borderRadius={10}
                    marginX={10}
                  />
                  <Skeleton
                    alignSelf="center"
                    width="90%"
                    height={45}
                    borderRadius={10}
                    marginX={10}
                  />
                </>
              )}
            </ScrollView>
          </View>
        </View>
        <View style={styles.workoutDaysBody}>
          <View style={styles.workoutDaysHeader}>
            <Text style={styles.dateMonthAndYear}>
              {monthName}, {year}
            </Text>
            <TouchableOpacity onPress={() => setChangeModalIsVisible(true)}>
              <Image
                style={{ marginRight: 20 }}
                source={require("./../../assets/calendaryIcon.png")}
              />
            </TouchableOpacity>
          </View>
          <LineSpace marginBottom={10} lineWidth="80%" />
          <ScrollView nestedScrollEnabled style={styles.workoutWeekList}>
            <WeekBox
              activeDay={
                userWorkouts.find((e) => e.day == "Segunda-Feira")
                  ? true
                  : false
              }
            >
              Segunda-Feira
            </WeekBox>
            <LineSpace lineWidth="80%" marginX={10} borderStyle="dotted" />
            <WeekBox
              activeDay={
                userWorkouts.find((e) => e.day == "Terça-Feira") ? true : false
              }
            >
              Terça-Feira
            </WeekBox>
            <LineSpace lineWidth="80%" marginX={10} borderStyle="dotted" />
            <WeekBox
              activeDay={
                userWorkouts.find((e) => e.day == "Quarta-Feira") ? true : false
              }
            >
              Quarta-Feira
            </WeekBox>
            <LineSpace lineWidth="80%" marginX={10} borderStyle="dotted" />
            <WeekBox
              activeDay={
                userWorkouts.find((e) => e.day == "Quinta-Feira") ? true : false
              }
            >
              Quinta-Feira
            </WeekBox>
            <LineSpace lineWidth="80%" marginX={10} borderStyle="dotted" />
            <WeekBox
              activeDay={
                userWorkouts.find((e) => e.day == "Sexta-Feira") ? true : false
              }
            >
              Sexta-Feira
            </WeekBox>
            <LineSpace lineWidth="80%" marginX={10} borderStyle="dotted" />
            <WeekBox
              activeDay={
                userWorkouts.find((e) => e.day == "Sábado") ? true : false
              }
            >
              Sábado
            </WeekBox>
            <LineSpace lineWidth="80%" marginX={10} borderStyle="dotted" />
            <WeekBox
              activeDay={
                userWorkouts.find((e) => e.day == "Domingo") ? true : false
              }
            >
              Domingo
            </WeekBox>
          </ScrollView>
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}
