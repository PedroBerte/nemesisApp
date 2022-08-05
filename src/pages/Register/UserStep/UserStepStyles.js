import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  userStepBody: {
    alignItems: "center",
  },
  selectModal: {
    width: "31%",
    backgroundColor: "white",
    color: "transparent",
    borderRadius: 15,
  },
  bigSelectModal: {
    width: "80%",
    backgroundColor: "white",
    color: "transparent",
    marginTop: 10,
    borderRadius: 15,
  },
  modalSelectStyle: {
    borderWidth: 1,
    borderColor: "#c6c6c6",
    borderRadius: 10,
    height: 50,
    display: "flex",
    justifyContent: "center",
  },
  registerSelectsBody: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gymDaysText: {
    fontSize: 16,
    color: "#868686",
    marginTop: 14,
    marginBottom: 10,
  },
  gymDaysSlider: {
    width: "100%",
  },
  gymDaysTextBody: {
    flexDirection: "row",
  },
});
export default styles;
