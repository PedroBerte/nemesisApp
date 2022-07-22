import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import UserAccount from "../UserAccount/UserAccount";
import TopBar from "../../components/TopBar/TopBar";
import TabBar from "../../components/TabBar/TabBar";

export default function Home({ navigation }) {
  return (
    <>
  <SafeAreaView style={styles.container}>
    <TopBar />
      <View style={styles.container}>
        <Text style={styles.text}>Página Inicial</Text>
      </View>
      </SafeAreaView>
      <TabBar/>
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
