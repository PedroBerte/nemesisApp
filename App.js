import React from "react";
import { StatusBar } from "expo-status-bar";
import Register from "./src/pages/Register/Register";
import Routes from "./src/Routes";
import TopBar from "./src/components/TopBar/TopBar";
import Home from "./src/pages/Home/Home";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserAccount from "./src/pages/UserAccount/UserAccount";
import StatusBarComponent from "./src/components/StatusBarComponent/StatusBarComponent";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBarComponent />
      <TopBar />
      <Routes />
    </NavigationContainer>
  );
}
