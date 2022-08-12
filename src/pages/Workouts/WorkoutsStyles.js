import React from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    marginTop: 20,
    marginLeft: 25,
    fontSize: 30,
    color: "#303030",
    fontWeight: "bold",
  },
  workoutSelectorBody: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-around",
    // alignItems: "center",
    marginTop: 25,
  },
  borderLine: {
    backgroundColor: "#E3E3E3",
    width: "80%",
    height: 2,
    alignSelf: "center",
    marginTop: 10
  },
  workoutMenu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
});

export default styles;
