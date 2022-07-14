import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function TabBar() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        backgroundColor:
          "linear-gradient(91.33deg, rgba(69, 196, 176, 0.44) 0%, #C5DEC0 100%)",
        height: 60,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Workouts")}>
        <Image
          source={require("../../assets/gymIcon.png")}
          style={{ width: 40, height: 50 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Diet")}>
        <Image
          source={require("../../assets/dietIcon.png")}
          style={{ width: 30, height: 40 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Reminder")}>
        <Image
          source={require("../../assets/notificationIcon.png")}
          style={{ width: 30, height: 40 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
        <Image
          source={require("../../assets/settingsIcon.png")}
          style={{ width: 30, height: 40 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
