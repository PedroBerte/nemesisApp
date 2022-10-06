import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import { Skeleton } from "moti/skeleton";

const TaskBox = (props) => {
  const Spacer = ({ height }) => <View style={{ height: height }} />;
  return (
    <>
      <Spacer height={15} />
      <Skeleton show={props.isLoading} colorMode="light">
        <View style={styles.tasks}>
          <View style={styles.leftSide}>
            <Image source={require("../../assets/Bell.png")} />
            <Text style={styles.taskText}>{props.children}</Text>
          </View>
          <Text>{props.hour}</Text>
        </View>
      </Skeleton>
    </>
  );
};

const styles = StyleSheet.create({
  tasks: {
    backgroundColor: "rgba(29, 29, 29, 0.08)",
    height: 45,
    width: "100%",
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(29, 29, 29, 0.20)",
    borderWidth: 1,
  },
  taskText: {
    fontSize: 15,
    marginLeft: 10,
  },
  leftSide: {
    display: "flex",
    flexDirection: "row",
  },
});

export default TaskBox;
