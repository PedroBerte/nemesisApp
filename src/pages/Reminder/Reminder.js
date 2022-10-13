import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { db } from "../../services/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";
import TaskBox from "../../components/TaskBox/TaskBox";
import ReminderBox from "../../components/ReminderBox/ReminderBox";

import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Reminder() {
  const [userReminders, setUserReminders] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user != undefined) {
      async function getUserReminders() {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        setUserReminders(userDocs.data().reminders);
      }
      getUserReminders();
    }
  }, []);

  async function sendPushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Remember to drink water!",
        icon: "./assets/notificationIcon.png ",
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
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
            {userReminders != [] ? (
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
              <></>
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
            <ReminderBox>Beber Água</ReminderBox>
            <ReminderBox>Refeições</ReminderBox>
            <ReminderBox>Treino</ReminderBox>
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
