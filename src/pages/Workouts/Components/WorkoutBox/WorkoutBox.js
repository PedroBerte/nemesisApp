import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function WorkoutBox(props) {
  return (
    <View style={styles.workoutBoxBody}>
      <Text style={styles.workoutName}>{props.children}</Text>
      <Text style={styles.workoutRep}>{props.rep}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  workoutBoxBody: {
    backgroundColor: "#F5F5F5",
    height: 45,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D7D7D7",
    borderRadius: 10,
  },
  workoutName: {
    marginLeft: 10,
  },
  workoutRep: {
    marginRight: 10,
  },
});
