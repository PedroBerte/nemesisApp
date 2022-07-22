import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";
import UserAccount from "../UserAccount/UserAccount";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.text}>Página Inicial</Text>
      </View>
      <TabBar />
    </SafeAreaView>
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
