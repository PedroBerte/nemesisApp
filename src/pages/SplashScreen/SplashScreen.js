import React, { useContext, useEffect } from "react";
import { View } from "react-native";

import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import StatusBarComponent from "../../components/StatusBarComponent/StatusBarComponent";

import { AuthContext } from "../../context/AuthContext";

const SplashScreen = () => {
  const { setAnimationIsEnded } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setAnimationIsEnded(true);
    }, 5000);
  }, []);

  return (
    <>
      <StatusBarComponent color={"#FFF"} style={"dark-content"} />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={["#FFF", "#C5DEC0"]}
          style={{ width: "100%", height: "100%" }}
        />
        <LottieView
          source={require("../../assets/data.json")}
          autoPlay
          loop={false}
        />
      </View>
    </>
  );
};

export default SplashScreen;
