import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";
import Skeleton from "../../components/Skeleton/Skeleton";
import { WorkoutBox } from "./WorkoutBox/WorkoutBox";
import WeekBox from "./WeekBox/WeekBox";
import LineSpace from "../../components/LineSpace/LineSpace";
import ModalChangeParameters from "../../components/ModalChangeParameters/ModalChangeParameters";
import WorkoutDaysModal from "./WorkoutDaysModal/WorkoutDaysModal";

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

  const [gymDays, setGymDays] = useState("");

  const [changeModalIsVisible, setChangeModalIsVisible] = useState(false);
  const [workoutDaysModalIsVisible, setWorkoutDaysModalIsVisible] =
    useState(false);

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
        setGymDays(userDocs.data().gymDays);
      }
    }
    async function getWorkouts() {
      const userDocs = await getDoc(doc(db, "workouts", user.uid));
      setUserWorkouts(userDocs.data().workouts);
    }
    getUserDocs();
    getWorkouts();
  }, [user]);

  return (
    <>
      <ModalChangeParameters
        get={changeModalIsVisible}
        set={setChangeModalIsVisible}
      />
      <TopBar />
      <WorkoutDaysModal
        userWorkouts={userWorkouts}
        gymDays={gymDays}
        set={setWorkoutDaysModalIsVisible}
        get={workoutDaysModalIsVisible}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Treinos</Text>
        <View style={styles.workoutMenu}>
          {userWorkouts != [] ? (
            <>
              {userWorkouts
                .filter((item) => item.workoutInfos.name != undefined)
                .map((workoutDay, i) => {
                  return (
                    <Text
                      key={i}
                      onPress={() => setWorkoutIndex(i)}
                      style={
                        workoutIndex == i ? styles.active : styles.inactive
                      }
                    >
                      {workoutDay.workoutInfos.name}
                    </Text>
                  );
                })}
            </>
          ) : (
            <Skeleton width={350} height={40} borderRadius={10} marginX={10} />
          )}
        </View>

        <LineSpace lineWidth="80%" marginTop={-2} />

        <View style={styles.workoutListBody}>
          <View style={styles.workoutListHeader}>
            {userWorkouts[workoutIndex] != undefined ? (
              <>
                <Text>{userWorkouts[workoutIndex].workoutInfos.muscles}</Text>
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
                {userWorkouts[workoutIndex].workoutInfos.workoutsList.map(
                  (workout, i) => {
                    return (
                      <WorkoutBox rep={workout.rep} key={i}>
                        {workout.name}
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
        <View style={styles.workoutDaysBody}>
          <View style={styles.workoutDaysHeader}>
            <Text style={styles.dateMonthAndYear}>
              {monthName}, {year}
            </Text>
            <TouchableOpacity
              onPress={() => setWorkoutDaysModalIsVisible(true)}
            >
              <Image
                style={{ marginRight: 20 }}
                source={require("./../../assets/calendaryIcon.png")}
              />
            </TouchableOpacity>
          </View>
          <LineSpace marginBottom={10} lineWidth="80%" />
          <ScrollView nestedScrollEnabled style={styles.workoutWeekList}>
            {userWorkouts[workoutIndex] != undefined ? (
              <>
                {userWorkouts.map((workoutDay, i) => {
                  return (
                    <>
                      <WeekBox
                        activeDay={
                          workoutDay.workoutInfos.name == undefined
                            ? false
                            : true
                        }
                        key={i}
                      >
                        {workoutDay.day}
                      </WeekBox>
                      {userWorkouts.lastIndexOf(workoutDay) ==
                      userWorkouts.length - 1 ? (
                        <></>
                      ) : (
                        <LineSpace
                          lineWidth="80%"
                          marginX={10}
                          borderStyle="dotted"
                        />
                      )}
                    </>
                  );
                })}
              </>
            ) : (
              <Skeleton
                alignSelf="center"
                width={80}
                height={15}
                borderRadius={10}
              />
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}
