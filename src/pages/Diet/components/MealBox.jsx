import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";

export default function MealBox({ meal }) {
  function getIcon() {
    switch (meal.meal) {
      case "Café da manhã":
        return require("../../../assets/breakfastIcon.png");
      case "Lanche da manhã":
        return require("../../../assets/morningSnackIcon.png");
      case "Almoço":
        return require("../../../assets/lunchIcon.png");
      case "Lanche da tarde":
        return require("../../../assets/afternoonSnackIcon.png");
      case "Jantar":
        return require("../../../assets/lunchIcon.png");
    }
  }

  return (
    <View style={styles.body}>
      <Image source={getIcon()} style={styles.icon} />
      <View style={styles.textsBody}>
        <Text style={styles.mealName}>{meal.meal}</Text>
        <Text style={styles.mealTime}>{meal.time}</Text>
      </View>
      <TouchableOpacity style={styles.arrowBody}>
        <Image source={require("../../../assets/downArrow.png")} />
      </TouchableOpacity>
    </View>
  );
}

const styles = {
  body: {
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
    height: 70,
    backgroundColor: "#F5F5F5",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
  mealName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#303030",
  },
  mealTime: {
    fontSize: 17,
    color: "#303030",
  },
  icon: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  textsBody: {
    flex: 1,
    justifyContent: "center",
  },
  arrowBody: {
    paddingTop: 15,
    marginRight: 15,
  },
};
