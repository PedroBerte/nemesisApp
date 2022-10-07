import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    marginTop: 20,
    marginLeft: 25,
    marginBottom: 15,
    fontSize: 30,
    color: "#303030",
    fontWeight: "bold",
  },
  workoutSelectorBody: {
    flexDirection: "column",
    display: "flex",
    marginTop: 25,
  },
  workoutListHeader: {
    marginTop: 10,
    marginBottom: 10,
  },
  workoutImageBody: {
    width: 200,
    bnackgroundColor: "red",
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
  alignStartButton: {
    width: "100%",
    alignItems: "center",
    marginVertical: 10,
  },
  workoutDaysBody: {
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 15,
    marginLeft: 25,
    marginRight: 25,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#D7D7D7",
    maxHeight: 270,
    overflow: "scroll",
    paddingBottom: 10,
  },
  workoutDaysHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
    paddingTop: 15,
  },
  dateMonthAndYear: {
    fontSize: 17,
    marginLeft: 20,
  },
  workoutWeekList: {
    width: "100%",
  },
});

export default styles;
