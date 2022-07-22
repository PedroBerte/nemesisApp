import React, {useEffect, useContext, useState} from "react";
import TopBar from "./src/components/TopBar/TopBar";
import { NavigationContainer } from "@react-navigation/native";
import StatusBarComponent from "./src/components/StatusBarComponent/StatusBarComponent";
import Routes from "./src/Routes/Routes";
import TabBar from "./src/components/TabBar/TabBar";
import Register from './src/pages/Register/Register'
import { auth, db } from "./src/services/firebase-config";
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import { AuthContext } from "./src/context/AuthContext";

export default function App() {
  // const { user, setUser } = useContext(AuthContext);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });
  //   console.warn(user);
  // });
  return (
    <NavigationContainer>
      <StatusBarComponent />
      <TopBar />
      <Routes />
      <TabBar />
    </NavigationContainer>
  );
}
