import React, { useContext, useEffect } from "react";

import Home from "../pages/Home/Home";
import UserAccount from "../pages/UserAccount/UserAccount";
import Workouts from "../pages/Workouts/Workouts";
import Diet from "../pages/Diet/Diet";
import Reminder from "../pages/Reminder/Reminder";
import Settings from "../pages/Settings/Settings";
import Login from "../pages/Login/Login";
import SplashScreen from "../pages/SplashScreen/SplashScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthContextProvider from "../context/AuthContext";
import { AuthContext } from "../context/AuthContext";

export default function NewRoutes() {
  const { user, animationIsEnded } = useContext(AuthContext);

  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "fade" }}
      >
        {animationIsEnded ? (
          <>
            {user?.uid == undefined ? (
              <Stack.Screen name="Login" component={Login} />
            ) : (
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="UserAccount" component={UserAccount} />
                <Stack.Screen name="Workouts" component={Workouts} />
                <Stack.Screen name="Diet" component={Diet} />
                <Stack.Screen name="Reminder" component={Reminder} />
                <Stack.Screen name="Settings" component={Settings} />
              </>
            )}
          </>
        ) : (
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        )}
      </Stack.Navigator>
    </>
  );
}
