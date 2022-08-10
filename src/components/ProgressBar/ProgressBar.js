import React from "react";
import { View, StyleSheet } from "react-native";

const ProgressBar = ({ color, value, width }) => {
  var progress = `${value}%`;

  return (
    <View
      style={{
        width: width,
        height: 10,
        borderRadius: 10,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowColor: "#000000",
        shadowOffset: {
          width: 6,
          height: 6,
        },
        elevation: 10,
        shadowOpacity: 0.2,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          backgroundColor: color,
          width: progress,
          height: 10,
          borderRadius: 10,
        }}
      ></View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProgressBar;
