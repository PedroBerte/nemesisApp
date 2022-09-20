import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Constants from "expo-constants";

export default function StatusBarComponent({ color, style }) {
  return (
    <View style={styles.StatusBar}>
      <StatusBar
        animated={true}
        backgroundColor={color}
        barStyle={style}
        hidden={false}
      />

      <StatusBar translucent barStyle={style} />
    </View>
  );
}

const styles = StyleSheet.create({
  StatusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: "#FFF",
  },
});
