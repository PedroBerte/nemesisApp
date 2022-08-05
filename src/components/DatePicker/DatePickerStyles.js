import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  btnData: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.2,
    borderColor: "#C6C6C6",
    marginBottom: 10,
    borderWidth: 1,
  },
  dataPickerBody: {
    display: "flex",
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
