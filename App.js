import React, { useEffect, useContext, useState } from "react";
import TopBar from "./src/components/TopBar/TopBar";
import { NavigationContainer } from "@react-navigation/native";
// import StatusBarComponent from "./src/components/StatusBarComponent/StatusBarComponent";
import Routes from "./src/Routes/Routes";
import TabBar from "./src/components/TabBar/TabBar";
import Register from "./src/pages/Register/Register";
import { auth, db } from "./src/services/firebase-config";
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AuthContextProvider from "./src/context/AuthContext";
import SignUpContextProvider from "./src/context/SignUpContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <SignUpContextProvider>
          {/* <StatusBarComponent /> */}
          <Routes />
        </SignUpContextProvider>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
