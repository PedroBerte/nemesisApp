import React, { useContext, useEffect } from "react";

import Home from "../pages/Home/Home";
import UserAccount from "../pages/UserAccount/UserAccount";
import Workouts from "../pages/Workouts/Workouts";
import Diet from "../pages/Diet/Diet";
import Reminder from "../pages/Reminder/Reminder";
import Settings from "../pages/Settings/Settings";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import SplashScreen from "../pages/SplashScreen/SplashScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuthContext } from "../context/AuthContext";

export default function NewRoutes() {
  const { user, animationIsEnded } = useAuthContext();

  const Stack = createNativeStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "fade" }}
      >
        {animationIsEnded ? (
          <>
            {user?.uid == undefined ? (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
              </>
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
