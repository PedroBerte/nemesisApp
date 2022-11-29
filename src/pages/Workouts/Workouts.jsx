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

import { useAnimationState, MotiView } from "moti";

import WorkoutList from "./Components/WorkoutList/WorkoutList";
import WorkoutMenu from "./Components/WorkoutMenu/WorkoutMenu";
import Button from "../../components/Button/Button";

import styles from "./WorkoutsStyles";
import StopWatch from "./Components/Stopwatch/Stopwatch";

export default function Workouts() {
  const { user, setUser } = useAuthContext();

  const [userWorkouts, setUserWorkouts] = useState([]);
  const [workoutTypeIndex, setWorkoutTypeIndex] = useState(0);
  const [workoutIndex, setWorkoutIndex] = useState(0);

  const [gymDays, setGymDays] = useState("");
  const [gymAvail, setGymAvail] = useState("");

  const [changeModalIsVisible, setChangeModalIsVisible] = useState(false);
  const [workoutDaysModalIsVisible, setWorkoutDaysModalIsVisible] =
    useState(false);
  const [timerModalIsVisible, setTimerModalIsVisible] = useState(false);

  const [workoutIsStarted, setWorkoutIsStarted] = useState(false);

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
      console.log(userWorkouts);
    }
  }, [userWorkouts]);

  useEffect(() => {
    buttonAnimated.transitionTo("onClose");
    heightAnimated.transitionTo("onClose");
  }, []);

  const handleStartButtonPressed = () => {
    setWorkoutIsStarted(!workoutIsStarted);
    if (heightAnimated.current === "onOpen") {
      heightAnimated.transitionTo("onClose");
    } else {
      heightAnimated.transitionTo("onOpen");
    }
    if (workoutIsStarted) {
      buttonAnimated.transitionTo("onClose");
    } else {
      buttonAnimated.transitionTo("onOpen");
    }
  };

  function renderWeekBoxSkeletons() {
    const arr = Array.from({ length: 5 }).map(() => true);
    return arr.map((_, index) => (
      <>
        <Skeleton colorMode="light" height={30} width="80%" />
        {arr.lastIndexOf(arr) == arr.length - 1 ? (
          <></>
        ) : (
          <LineSpace lineWidth="80%" marginX={3} borderStyle="dotted" />
        )}
      </>
    ));
  }

  const heightAnimated = useAnimationState({
    onOpen: {
      height: 200,
    },
    onClose: {
      height: 0,
    },
  });

  const buttonAnimated = useAnimationState({
    onOpen: {
      width: "40%",
    },
    onClose: {
      width: 0,
    },
  });

  return (
    <>
      <TopBar />

      <StopWatch
        isOpen={timerModalIsVisible}
        setClose={setTimerModalIsVisible}
      />

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
        <View
          style={{
            alignSelf: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton colorMode="light" height={28} width="80%" show={isLoading}>
            <WorkoutMenu
              setWorkoutTypeIndex={setWorkoutTypeIndex}
              setWorkoutIndex={setWorkoutIndex}
              userWorkouts={userWorkouts}
              workoutTypeIndex={workoutTypeIndex}
              isLoading={isLoading}
            />
          </Skeleton>
        </View>

        <LineSpace lineWidth="80%" marginTop={-4} />

        <View style={styles.workoutListBody}>
          <View style={styles.workoutListHeader}>
            <Skeleton show={isLoading} colorMode="light">
              <Text>
                {!isLoading
                  ? userWorkouts[workoutTypeIndex].workoutInfos.muscles
                  : "Carregando..."}
              </Text>
            </Skeleton>
          </View>

          <LineSpace lineWidth="80%" />

          <MotiView
            transition={{
              type: "timing",
              duration: 300,
            }}
            state={heightAnimated}
            style={
              heightAnimated.current === "onOpen"
                ? styles.workoutImageBodyActive
                : styles.workoutImageBodyInactive
            }
          >
            {!isLoading ? (
              <Image
                style={{ flex: 1 }}
                resizeMode="cover"
                source={{
                  uri: `${userWorkouts[workoutTypeIndex].workoutInfos.workoutsList[workoutIndex].gif}`,
                }}
              />
            ) : (
              <></>
            )}
          </MotiView>

          <WorkoutList
            userWorkouts={userWorkouts}
            workoutTypeIndex={workoutTypeIndex}
            setWorkoutIndex={setWorkoutIndex}
            workoutIndex={workoutIndex}
            workoutIsStarted={workoutIsStarted}
            isLoading={isLoading}
          />

          <View style={styles.alignStartButton}>
            <Button
              onPress={
                workoutIsStarted
                  ? () => setTimerModalIsVisible(true)
                  : handleStartButtonPressed
              }
            >
              {workoutIsStarted ? "TIMER" : "COMEÇAR"}
            </Button>
            <MotiView
              transition={{
                type: "timing",
                duration: 200,
              }}
              state={buttonAnimated}
              style={styles.endWorkoutButton}
            >
              <TouchableOpacity onPress={handleStartButtonPressed}>
                <Text
                  style={
                    workoutIsStarted
                      ? {
                          alignSelf: "center",
                          color: "#fff",
                          fontWeight: "bold",
                        }
                      : { width: 0, height: 0, overflow: "hidden" }
                  }
                >
                  TÁ PAGO
                </Text>
              </TouchableOpacity>
            </MotiView>
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
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                {renderWeekBoxSkeletons()}
              </View>
            )}
          </ScrollView>
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}
