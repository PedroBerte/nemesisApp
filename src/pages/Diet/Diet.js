import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";
import StatusBarComponent from "../../components/StatusBarComponent/StatusBarComponent";

export default function Diet() {
  return (
    <>
      <StatusBarComponent
        color={"rgba(69, 196, 176, 0.44)"}
        style={"dark-content"}
      />
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.text}>Dieta</Text>
      </View>
      <TabBar />
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
