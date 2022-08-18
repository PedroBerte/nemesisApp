import React from "react";
import { View, Text } from "react-native";

export default function Skeleton(props) {
  if (!props.circle) {
    return (
      <View
        style={{
          width: props.width,
          height: props.height,
          backgroundColor:
            "linear-gradient(90deg, rgba(217, 217, 217, 0.5) 0%, #ECEBEB 100%);",
          borderRadius: props.borderRadius,
          alignSelf: props.alignSelf,
          marginTop: props.marginTop || props.marginX,
          marginBottom: props.marginBottom || props.marginX,
        }}
      ></View>
    );
  } else {
    return (
      <View
        style={{
          width: props.width,
          height: props.height,
          borderRadius: "50%",
          backgroundColor: "black",
        }}
      ></View>
    );
  }
}
