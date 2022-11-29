import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { db } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";
import TaskBox from "../../components/TaskBox/TaskBox";
import ReminderBox from "../../components/ReminderBox/ReminderBox";

import { Skeleton } from "moti/skeleton";
import Toast from "react-native-toast-message";
import * as Notifications from "expo-notifications";

import { useAuthContext } from "../../context/AuthContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Reminder() {
  const [userReminders, setUserReminders] = useState("");
  const { user } = useAuthContext();

  const [waterReminderIsCheked, setWaterReminderIsCheked] = useState(false);
  const [mealReminderIsCheked, setMealReminderIsCheked] = useState(false);
  const [workoutReminderIsCheked, setWorkoutReminderIsCheked] = useState(false);

  useEffect(() => {
    if (user != undefined) {
      async function getUserReminders() {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        setUserReminders(userDocs.data().reminders);
      }
      getUserReminders();
    }
  }, [user]);

  useEffect(() => {
    if (user != undefined) {
      async function getUserReminders() {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        setUserReminders(userDocs.data().reminders);
      }
      async function getReminders() {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        setWaterReminderIsCheked(userDocs.data().waterReminder);
        setMealReminderIsCheked(userDocs.data().mealReminder);
        setWorkoutReminderIsCheked(userDocs.data().workoutReminder);
      }
      getUserReminders();
      getReminders();
    }
  }, []);

  const Spacer = () => <View style={{ height: 15 }} />;

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <Toast />
        <TopBar />
        <View style={styles.container}>
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={styles.text}>Sua Rotina</Text>

            <TouchableOpacity>
              <Text style={{ color: "#1E88E5" }}>Alterar</Text>
            </TouchableOpacity>
          </View>

          <View>
            {userReminders != "" ? (
              <>
                {userReminders.map((reminder, index) => (
                  <TaskBox
                    key={index}
                    index={index}
                    hour={reminder.time}
                    userReminders={userReminders}
                    set={setUserReminders}
                  >
                    {reminder.title}
                  </TaskBox>
                ))}
              </>
            ) : (
              <>
                <Spacer />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer />
                <Skeleton width="100%" height={45} colorMode="light" />
              </>
            )}
          </View>

          <View style={styles.spacer} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={styles.text}>Lembretes</Text>
          </View>
          <View style={{ paddingBottom: 50 }}>
            <ReminderBox
              type={"water"}
              isChecked={waterReminderIsCheked}
              set={setWaterReminderIsCheked}
            >
              Beber Água
            </ReminderBox>
            <ReminderBox
              isChecked={mealReminderIsCheked}
              type={"meal"}
              set={setMealReminderIsCheked}
            >
              Refeições
            </ReminderBox>
            <ReminderBox
              isChecked={workoutReminderIsCheked}
              type={"workout"}
              set={setWorkoutReminderIsCheked}
            >
              Treino
            </ReminderBox>
          </View>
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#303030",
  },
  spacer: {
    width: "100%",
    backgroundColor: "rgba(29, 29, 29, 0.08)",
    height: 1,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 30,
  },
});
