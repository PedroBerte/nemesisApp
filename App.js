import React from "react";
import TopBar from "./src/components/TopBar/TopBar";
import { NavigationContainer } from "@react-navigation/native";
import StatusBarComponent from "./src/components/StatusBarComponent/StatusBarComponent";
import Routes from "./src/Routes/Routes";
import TabBar from "./src/components/TabBar/TabBar";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBarComponent />
      <TopBar />
      <Routes />
      <TabBar />
    </NavigationContainer>
  );
}
