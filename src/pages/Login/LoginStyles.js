import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  toast: {
    backgroundColor: "#EBEBEB",
  },
  body: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    shadowColor: "#000000",
    shadowOffset: {
      width: 6,
      height: 6,
    },
    shadowOpacity: 0.2,
    borderColor: "#C6C6C6",
    borderWidth: 1,
  },
  btnRegister: {
    width: "40%",
    height: 50,
    backgroundColor: "#45c4b0",
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 20,
  },
  rightDiv: {
    width: "80%",
    marginTop: -15,
  },
});

export default styles;
