import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StatusBarComponent from "./src/components/StatusBarComponent/StatusBarComponent";
import Routes from "./src/Routes/Routes";
import AuthContextProvider from "./src/context/AuthContext";
import SignUpContextProvider from "./src/context/SignUpContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <SignUpContextProvider>
          <StatusBarComponent
            color={"rgba(69, 196, 176, 0.44)"}
            style={"dark-content"}
          />
          <Routes />
        </SignUpContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
