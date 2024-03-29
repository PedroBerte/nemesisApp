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
  workoutImageBodyActive: {
    width: 200,
    borderColor: "#DADADA",
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#DADADA",
  },
  workoutImageBodyInactive: {
    width: 200,
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
  endWorkoutButton: {
    height: 40,
    backgroundColor: "#E92B2B",
    borderRadius: 10,
    alignItens: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  alignStartButton: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    flexDirection: "row",
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
