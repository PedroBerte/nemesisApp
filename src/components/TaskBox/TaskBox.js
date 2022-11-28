import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { auth, db } from "../../services/firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useAuthContext } from "../../context/AuthContext";

const TaskBox = (props) => {
  const { user } = useAuthContext();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [newReminders, setNewReminders] = useState(props.userReminders);

  const handleDatePickerVisibility = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const handleConfirm = async (date) => {
    var pressDate = date
      .toLocaleTimeString("en-US")
      .split(":")
      .slice(0, 2)
      .join(":");
    setNewReminders(
      [...newReminders],
      (newReminders[props.index].time = pressDate)
    );
    props.set(newReminders);
    props.set(newReminders);
    await updateDoc(doc(db, "users", user.uid), {
      reminders: newReminders,
    });
    handleDatePickerVisibility();
  };

  const Spacer = ({ height }) => <View style={{ height: height }} />;

  return (
    <>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={handleDatePickerVisibility}
      />
      <Spacer height={15} />
      <TouchableOpacity
        onPress={() => handleDatePickerVisibility()}
        style={styles.tasks}
      >
        <View style={styles.leftSide}>
          <Image source={require("../../assets/Bell.png")} />
          <Text style={styles.taskText}>{props.children}</Text>
        </View>
        <Text>{props.hour}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  tasks: {
    backgroundColor: "rgba(29, 29, 29, 0.08)",
    height: 45,
    width: "100%",
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
    marginLeft: 10,
  },
  leftSide: {
    display: "flex",
    flexDirection: "row",
  },
});

export default TaskBox;
