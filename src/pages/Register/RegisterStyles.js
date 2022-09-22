import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#EBEBEB",
  },
  logo: {
    resizeMode: "center",
    width: 210,
    height: 100,
    marginBottom: 20,
  },
  textAlreadyHaveAnAccount: {
    fontStyle: "italic",
    color: "#1F67A9",
    marginTop: 20,
    textAlign: "center",
  },
});

export default styles;
