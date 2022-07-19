import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import UserAccount from "../UserAccount/UserAccount";

export default function Home({ navigation }) {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Página Inicial</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
