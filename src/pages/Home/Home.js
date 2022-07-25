import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import UserAccount from "../UserAccount/UserAccount";
import TopBar from "../../components/TopBar/TopBar";
import TabBar from "../../components/TabBar/TabBar";

export default function Home() {
  return (
    <>
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.text}>Página Inicial</Text>
      </View>
      <TabBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
