import { View } from "react-native";
import React from "react";

export default function LineSpace(props) {
  return (
    <View
      style={{
        marginTop: props.marginTop || props.marginX,
        marginBottom: props.marginBottom || props.marginX,
        borderColor: "#E3E3E3",
        borderBottomWidth: 1,
        width: props.lineWidth,
        alignSelf: "center",
        borderStyle: props.borderStyle,
      }}
    ></View>
  );
}
