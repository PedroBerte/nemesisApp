import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  emailStepBody: {
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
    elevation: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    borderColor: "#C6C6C6",
    borderWidth: 1,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  line: {
    width: 1,
    height: "80%",
    backgroundColor: "#BEBEBE",
    marginLeft: 14,
    marginRight: 14,
  },
  googleButtonBody: {
    width: 80,
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#C6C6C6",
  },
  googleButtonImage: {
    resizeMode: "contain",
  },
  googleButtonText: {
    fontSize: 12,
    color: "#868686",
    textAlign: "center",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
export default styles;
