import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  nextMealBody: {
    width: "100%",
    height: 100,
    backgroundColor: "#F5F5F5",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    color: "#303030",
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
    color: "#303030",
    marginBottom: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingLeft: 25,
    paddingRight: 25,
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
  elipseIndicator: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
  foodName: {
    fontSize: 16,
    justifyContent: "center",
    marginLeft: 25,
    marginRight: 25,
    color: "#303030",
  },
  defaultText: {
    fontSize: 16,
    justifyContent: "center",
    marginLeft: 25,
    color: "#303030",
  },
  optionText: {
    alignSelf: "center",
    color: "#303030",
    marginBottom: 4,
  },
});

export default styles;
