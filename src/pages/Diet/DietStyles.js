import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  nextMealBody: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    height: 100,
    backgroundColor: "#F5F5F5",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 10,
  },
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
    // paddingLeft: 25,
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
