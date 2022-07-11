// import React from "react";
// import {
//   View,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   TouchableOpacity,
// } from "react-native";

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Statusbar from "./components/StatusBar/StatusBar";
// import Home from "./pages/Home/Home";
// import UserAccount from "./pages/UserAccount/UserAccount";
// import Workouts from "./pages/Workouts/Workouts";
// import Diet from "./pages/Diet/Diet";
// import Reminder from "./pages/Reminder/Reminder";
// import Settings from "./pages/Settings/Settings";


// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { LinearGradient } from "expo-linear-gradient";


// const Tab = createBottomTabNavigator();

// const Stack = createNativeStackNavigator();


// export default function Routes() {
//         return (
//             <NavigationContainer>
           

//             <Tab.Navigator
//         screenOptions={({ route }) => ({
//           headerShown: false,
//           tabBarActiveTintColor: "white",
//           tabBarInactiveTintColor: "white",
//           tabBarShowLabel: false,

//           tabBarIcon: ({ color, size }) => {
//             let iconName;

//             switch (route.name) {
//               case "Workouts":
//                 iconName = "weight-lifter";
//                 break;
//                 case "Diet":
//                 iconName = "food-apple-outline";
//                 break;
//               case "Reminder":
//                 iconName = "bell-outline";
//                 break;
//               case "Settings":
//                 iconName = "cogs";
//                 break;
//             }

//             return <Icon name={iconName} size={size} color={color} />;
//           },

//           tabBarBackground: () => (
//             <View>
//               <LinearGradient
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//                 colors={["#45C4B0", "#9aeba3"]}
//                 style={{ height: 100 }}
//               />
//             </View>
//           ),
//         })}
//       >
//         <Tab.Screen name="Workouts" component={Workouts} />

//         <Tab.Screen name="Diet" component={Diet} />

//         <Tab.Screen name="Reminder" component={Reminder} />

//         <Tab.Screen name="Settings" component={Settings} />


//       </Tab.Navigator>
//             </NavigationContainer>
//         );
// };