import React from 'react'
import { StatusBar } from 'expo-status-bar';
import Register from './src/pages/Register/Register';
import Routes from './src/Routes';
import TabBar from './src/components/TabBar/TabBar';
import Home from './src/pages/Home/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserAccount from './src/pages/UserAccount/UserAccount';




export default function App() {
  return (

<TabBar/>

  );
}

