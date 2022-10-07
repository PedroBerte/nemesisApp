import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export function WorkoutBox(props) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.workoutBoxBody,
        props.isActive ? styles.active : styles.inative,
      ]}
    >
      <Text style={styles.workoutName}>{props.children}</Text>
      <Text style={styles.workoutRep}>{props.rep}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  active: {
    backgroundColor: "#ADEFB4",
    color: "white",
  },
  inative: {
    backgroundColor: "#F5F5F5",
    color: "white",
  },
  workoutBoxBody: {
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
