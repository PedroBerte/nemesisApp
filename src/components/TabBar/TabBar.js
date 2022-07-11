import React from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Workouts from "../../pages/Workouts/Workouts";
import Diet from "../../pages/Diet/Diet";
import Reminder from "../../pages/Reminder/Reminder";
import Settings from "../../pages/Settings/Settings";
import Home from "../../pages/Home/Home";
import UserAccount from "../../pages/UserAccount/UserAccount";
import Statusbar from "../StatusBar/StatusBar";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function Comando() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Workouts":
              iconName = "weight-lifter";
              break;
            case "Diet":
              iconName = "food-apple-outline";
              break;
            case "Reminder":
              iconName = "bell-outline";
              break;
            case "Settings":
              iconName = "cogs";
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },

        tabBarBackground: () => (
          <View>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={["#45C4B0", "#9aeba3"]}
              style={{ height: 100 }}
            />
          </View>
        ),
      })}
    >
      <Tab.Screen name="Workouts" component={Workouts} />

      <Tab.Screen name="Diet" component={Diet} />

      <Tab.Screen name="Reminder" component={Reminder} />

      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// function UpToTop() {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: true }}>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="UserAccount" component={UserAccount} />
//     </Stack.Navigator>
//   );
// }



function Topo({navigation}) {
  return(
  <>
  <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.navigate("UserAccount")}>
    <Image
      source={require("../../assets/logo.png")}
      style={{ width: 40, height: 50 }}
      resizeMode="contain"
    />
  </TouchableOpacity>

  <TouchableOpacity>
    <Image
      source={require("../../assets/user.png")}
      style={{ width: 40, height: 40 }}
      resizeMode="contain"
    />
  </TouchableOpacity>
</View>
</>
);
}





export default function TabBar() {
  return (
    <>
      <Statusbar />
      <NavigationContainer independent={true}>
      

        <Topo/>

        <Comando/>
      </NavigationContainer>
    </>
  );
}











const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 10,
  },
});
