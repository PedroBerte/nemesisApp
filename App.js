import React, { useContext, useEffect, useState } from "react";
import TopBar from "./src/components/TopBar/TopBar";
import { NavigationContainer } from "@react-navigation/native";
import StatusBarComponent from "./src/components/StatusBarComponent/StatusBarComponent";
import Routes from "./src/Routes/Routes";
import TabBar from "./src/components/TabBar/TabBar";
import Login from "./src/pages/Login/Login";

import { AuthContext } from "./src/context/AuthContext";
import { auth, db } from "./src/services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

import AuthContextProvider from "./src/context/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <StatusBarComponent />
        <Routes />
      </AuthContextProvider>
    </NavigationContainer>
  );
}
