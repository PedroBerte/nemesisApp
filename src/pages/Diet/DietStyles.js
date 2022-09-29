import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 15,
    fontSize: 25,
    color: "#303030",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
  },
  text: {
    fontSize: 15,
    color: "#303030",
  },
  nextMealHeader: {
    marginTop: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  nextMealTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#303030",
  },
  nextMealContent: {
    display: "flex",
    flex: 1,
    paddingLeft: 25,
    justifyContent: "center",
  },
  nextMealText: {
    fontSize: 15,
    marginRight: 25,
  },
  nextMealTime: {
    fontSize: 15,
    color: "#303030",
  },
});

export default styles;
