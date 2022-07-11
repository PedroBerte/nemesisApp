import React, { Component } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Constants from "expo-constants";

class Statusbar extends Component {
  render() {
    return (
      <View style={styles.StatusBar}>
        <StatusBar
          animated={true}
          backgroundColor="#FFF"
          barStyle="dark-content"
          hidden={false}
        />

        <StatusBar translucent barStyle="dark-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  StatusBar: {
    height: Constants.statusBarHeight,
    backgroundColor: "#FFF",
  },
});

export default Statusbar;
