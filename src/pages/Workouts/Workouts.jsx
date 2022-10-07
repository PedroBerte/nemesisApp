import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";

import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";
import { Skeleton } from "moti/skeleton";
import WeekBox from "./Components/WeekBox/WeekBox";
import LineSpace from "../../components/LineSpace/LineSpace";
import UpdateModal from "../../components/UpdateModal/UpdateModal";
import WorkoutDaysModal from "./WorkoutDaysModal/WorkoutDaysModal";
import { useAuthContext } from "../../context/AuthContext";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import Button from "../../components/Button/Button";

import styles from "./WorkoutsStyles";

import { useAnimationState, MotiView } from "moti";
import WorkoutList from "./Components/WorkoutList/WorkoutList";
import WorkoutMenu from "./Components/WorkoutMenu/WorkoutMenu";

export default function Workouts() {
  const { user } = useAuthContext();

  const [userWorkouts, setUserWorkouts] = useState([]);
  const [workoutTypeIndex, setWorkoutTypeIndex] = useState(0);
  const [workoutIndex, setWorkoutIndex] = useState(0);

  const [gymDays, setGymDays] = useState("");
  const [gymAvail, setGymAvail] = useState("");

  const [changeModalIsVisible, setChangeModalIsVisible] = useState(false);

  const [workoutIsStarted, setWorkoutIsStarted] = useState(false);

  const [workoutDaysModalIsVisible, setWorkoutDaysModalIsVisible] =
    useState(false);

  const [isLoading, setIsLoading] = useState(true);

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
        setGymAvail(userDocs.data().gymAvail);
      }
    }
    async function getWorkouts() {
      const userDocs = await getDoc(doc(db, "workouts", user.uid));
      setUserWorkouts(userDocs.data().workouts);
    }
    getUserDocs();
    getWorkouts();
  }, [user]);

  useEffect(() => {
    if (userWorkouts.length > 0) {
      setIsLoading(false);
    }
  }, [userWorkouts]);

  const handleStartButtonPressed = () => {
    setWorkoutIsStarted(!workoutIsStarted);
    if (heightAnimated.current === "onOpen") {
      heightAnimated.transitionTo("onClose");
    } else {
      heightAnimated.transitionTo("onOpen");
    }
  };

  const heightAnimated = useAnimationState({
    onOpen: {
      height: 200,
    },
    onClose: {
      height: 0,
    },
  });

  return (
    <>
      <TopBar />
      <UpdateModal get={changeModalIsVisible} set={setChangeModalIsVisible} />
      <WorkoutDaysModal
        userWorkouts={userWorkouts}
        gymDays={gymDays}
        gymAvail={gymAvail}
        set={setWorkoutDaysModalIsVisible}
        get={workoutDaysModalIsVisible}
        uid={user.uid}
      />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Treinos</Text>
        <WorkoutMenu
          setWorkoutTypeIndex={setWorkoutTypeIndex}
          userWorkouts={userWorkouts}
          workoutTypeIndex={workoutTypeIndex}
          isLoading={isLoading}
        />

        <LineSpace lineWidth="80%" marginTop={-2} />

        <View style={styles.workoutListBody}>
          <View style={styles.workoutListHeader}>
            <Skeleton show={isLoading} colorMode="light">
              <Text>
                {!isLoading
                  ? userWorkouts[workoutTypeIndex].workoutInfos.muscles
                  : "Loading..."}
              </Text>
            </Skeleton>
          </View>

          <LineSpace lineWidth="80%" />

          <Skeleton show={isLoading} colorMode="light">
            <MotiView
              transition={{
                type: "spring",
                duration: 300,
              }}
              state={heightAnimated}
              style={styles.workoutImageBody}
            >
              {!isLoading ? (
                <Image
                  style={{ width: 200, flex: 1 }}
                  resizeMode="contain"
                  source={{
                    uri: `${userWorkouts[workoutTypeIndex].workoutInfos.workoutsList[workoutIndex].gif}`,
                  }}
                />
              ) : (
                <></>
              )}
            </MotiView>
          </Skeleton>

          <WorkoutList
            userWorkouts={userWorkouts}
            workoutTypeIndex={workoutTypeIndex}
            setWorkoutIndex={setWorkoutIndex}
            workoutIndex={workoutIndex}
            workoutIsStarted={workoutIsStarted}
          />

          <View style={styles.alignStartButton}>
            <Button onPress={handleStartButtonPressed}>
              <Text>COMEÇAR</Text>
            </Button>
          </View>
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
            {userWorkouts[workoutTypeIndex] != undefined ? (
              <>
                {userWorkouts.map((workoutDay, index) => {
                  return (
                    <>
                      <WeekBox
                        activeDay={
                          workoutDay.workoutInfos.name == undefined
                            ? false
                            : true
                        }
                        key={index}
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
              <></>
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}
