import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Button(props) {
  return (
    <TouchableOpacity {...props} style={styles.btnRegister}>
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {props.children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = {
  btnRegister: {
    width: "40%",
    height: 40,
    backgroundColor: "#45c4b0",
    borderRadius: 10,
    justifyContent: "center",
  },
};
