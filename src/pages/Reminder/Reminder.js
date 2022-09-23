import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";
import TaskBox from "../../components/TaskBox/TaskBox";
import ReminderBox from "../../components/ReminderBox/ReminderBox";
import StatusBarComponent from "../../components/StatusBarComponent/StatusBarComponent";

export default function Reminder() {
  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <TopBar />
        <View style={styles.container}>
          <View
            style={{
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={styles.text}>Sua Rotina</Text>

            <TouchableOpacity>
              <Text style={{ color: "#1E88E5" }}>Alterar</Text>
            </TouchableOpacity>
          </View>

          <View>
            <TaskBox hour={"6:30"}>Café da Manhã</TaskBox>
            <TaskBox hour={"7:30 - 9:00"}>Treino</TaskBox>
            <TaskBox hour={"9:15"}>Lanche (Pós-Treino)</TaskBox>
            <TaskBox hour={"12:30"}>Almoço</TaskBox>
            <TaskBox hour={"16:00"}>Café da Tarde</TaskBox>
            <TaskBox hour={"19:30"}>Jantar</TaskBox>
            <TaskBox hour={"22:00"}>Ceia</TaskBox>
          </View>

          <View style={styles.spacer} />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text style={styles.text}>Lembretes</Text>
          </View>
          <View style={{ paddingBottom: 50 }}>
            <ReminderBox>Beber Água</ReminderBox>
            <ReminderBox>Refeições</ReminderBox>
            <ReminderBox>Treino</ReminderBox>
          </View>
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#303030",
  },
  spacer: {
    width: "100%",
    backgroundColor: "rgba(29, 29, 29, 0.08)",
    height: 1,
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 30,
  },
});
