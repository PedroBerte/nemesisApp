import React from "react";

import Home from "../pages/Home/Home";
import UserAccount from "../pages/UserAccount/UserAccount";
import Workouts from "../pages/Workouts/Workouts";
import Diet from "../pages/Diet/Diet";
import Reminder from "../pages/Reminder/Reminder";
import Settings from "../pages/Settings/Settings";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function NewRoutes() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade" }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="UserAccount" component={UserAccount} />
        <Stack.Screen name="Workouts" component={Workouts} />
        <Stack.Screen name="Diet" component={Diet} />
        <Stack.Screen name="Reminder" component={Reminder} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </>
  );
}
