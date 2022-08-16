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
    marginTop: 25,
  },
  borderLine: {
    backgroundColor: "#E3E3E3",
    width: "80%",
    height: 1,
    alignSelf: "center",
    marginTop: -2,
  },
  workoutMenu: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  workoutListHeader: {
    marginTop: 10,
    marginBottom: 10,
  },
  workoutListBody: {
    display: "flex",
    alignItems: "center",
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D7D7D7",
  },
  workoutsSelector: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxHeight: 400,
    overflow: "scroll",
  },
  active: {
    color: "#45C4B0",
    fontWeight: "bold",
    borderBottomColor: "#45C4B0",
    paddingBottom: 5,
    borderBottomWidth: 3,
  },
});

export default styles;
