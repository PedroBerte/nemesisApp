import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import StatusBarComponent from "../../components/StatusBarComponent/StatusBarComponent";

import { useNavigation } from "@react-navigation/native";

import Modal from "react-native-modal";
import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";

export default function UserAccount() {
  return (
    <>
      <StatusBarComponent
        color={"rgba(69, 196, 176, 0.44)"}
        style={"dark-content"}
      />
      <TopBar />
      <View style={styles.container}>
        <Text style={styles.text}>Conta do Usuáriooo</Text>
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
