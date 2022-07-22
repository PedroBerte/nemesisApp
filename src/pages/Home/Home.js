import React from "react";
<<<<<<< HEAD
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
=======
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";
>>>>>>> c141249f6295996cbe79095347e6cbb8ad0054e6
import UserAccount from "../UserAccount/UserAccount";

export default function Home({ navigation }) {
  return (
<<<<<<< HEAD
    <>
  <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Página Inicial</Text>
      </View>
      </SafeAreaView>
    </>
=======
    <SafeAreaView style={styles.container}>
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.text}>Página Inicial</Text>
      </View>
      <TabBar />
    </SafeAreaView>
>>>>>>> c141249f6295996cbe79095347e6cbb8ad0054e6
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
