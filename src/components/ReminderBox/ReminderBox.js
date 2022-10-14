import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import * as Notifications from "expo-notifications";

import { db } from "../../services/firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { useAuthContext } from "../../context/AuthContext";

const ReminderBox = (props) => {
  const { user } = useAuthContext();
  const [isSelected, setSelected] = useState(props.isChecked);

  useEffect(() => {
    console.log(isSelected);
  }, [isSelected]);

  async function handleCheck() {
    setSelected(!isSelected);
    props.set(!isSelected);
    sendPushNotification(!isSelected);
    switch (props.type) {
      case "water":
        await updateDoc(doc(db, "users", user.uid), {
          waterReminder: !isSelected,
        });
        console.log("water");
        break;
      case "meal":
        await updateDoc(doc(db, "users", user.uid), {
          mealReminder: !isSelected,
        });
        console.log("meal");
        break;
      case "workout":
        await updateDoc(doc(db, "users", user.uid), {
          workoutReminder: !isSelected,
        });
        console.log("workout");
        break;
    }
  }

  async function sendPushNotification(bool) {
    await Notifications.cancelAllScheduledNotificationsAsync();
    // const identifier = "";
    // if (bool) {
    //   identifier = await Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: "Hey! alo",
    //     },
    //     trigger: { seconds: 15, repeats: true },
    //   });
    // } else {
    //   await Notifications.cancelScheduledNotificationAsync(identifier);
    // }
  }

  return (
    <TouchableOpacity
      onPress={() => {
        handleCheck();
      }}
    >
      <View style={styles.tasks}>
        <Text style={styles.taskText}>{props.children}</Text>

        {isSelected == false ? (
          <Image
            source={require("../../assets/grayCircle.png")}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../../assets/check.png")}
            resizeMode="contain"
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tasks: {
    backgroundColor: "rgba(29, 29, 29, 0.08)",
    height: 45,
    width: "100%",
    marginTop: 15,
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(29, 29, 29, 0.20)",
    borderWidth: 1,
  },
  taskText: {
    fontSize: 15,
  },
});

export default ReminderBox;
