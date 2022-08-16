import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";

export default function WeekBox(props) {
  return (
    <View style={styles.WeekBoxBody}>
      <Text>{props.children}</Text>
      {props.activeDay ? (
        <Image source={require("../../../assets/weightIcon.png")} />
      ) : (
        <Image source={require("../../../assets/zzzIcon.png")} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  WeekBoxBody: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
});
