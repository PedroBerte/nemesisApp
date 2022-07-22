import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import UserAccount from "../UserAccount/UserAccount";

export default function Home({ navigation }) {
  return (
    <>
  <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Página Inicial</Text>
      </View>
      </SafeAreaView>
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
