import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

import { AuthContext } from "../../context/AuthContext";

const SplashScreen = () => {
  const { setAnimationIsEnded } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setAnimationIsEnded(true);
    }, 5000);
  }, []);

  return (
    <LottieView source={require("../../assets/data.json")} autoPlay loop />
  );
};

export default SplashScreen;
