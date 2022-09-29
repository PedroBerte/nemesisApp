import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image, Text, ScrollView } from "react-native";

export default function MealBox({ meal }) {
  const [isPressed, setIsPressed] = useState(false);
  const [option, setOption] = useState(0);
  const [bodyWidth, setBodyWidth] = useState("");

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

  function isCloseToBottom({ layoutMeasurement, contentOffset, contentSize }) {
    return layoutMeasurement.width + contentOffset.x >= contentSize.width - 20;
  }
  function isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    return contentOffset.x == 0;
  }

  return (
    <View
      style={{
        marginTop: 20,
        width: "100%",
        height: isPressed ? "auto" : 70,
        backgroundColor: "#F5F5F5",
        borderColor: "#DCDCDC",
        borderWidth: 1,
        borderRadius: 10,
        flexDirection: "column",
        overflow: "hidden",
      }}
      onLayout={(event) => {
        setBodyWidth(event.nativeEvent.layout);
      }}
    >
      <View style={styles.header}>
        <Image source={getIcon()} style={styles.icon} />
        <View style={styles.textsBody}>
          <Text style={styles.mealName}>{meal.meal}</Text>
          <Text style={styles.mealTime}>{meal.time}</Text>
        </View>
        <TouchableOpacity
          style={styles.arrowBody}
          onPress={() => setIsPressed(!isPressed)}
        >
          <Image source={require("../../../assets/downArrow.png")} />
        </TouchableOpacity>
      </View>
      <ScrollView
        disableIntervalMomentum={true}
        horizontal
        snapToInterval={bodyWidth.width}
        onScroll={({ nativeEvent }) => {
          if (isCloseToTop(nativeEvent)) {
            setOption(0);
          }
          if (isCloseToBottom(nativeEvent)) {
            setOption(1);
          }
        }}
        style={styles.content}
      >
        <View
          style={{
            marginBottom: 20,
            width: bodyWidth.width,
          }}
        >
          {meal.option[0].foods.map((food) => {
            return (
              <Text style={styles.foodName}>
                - {food.name} - {food.quantity}
              </Text>
            );
          })}
        </View>
        <View
          style={{
            marginBottom: 20,
            width: bodyWidth.width,
          }}
        >
          {meal.option[1].foods.map((food) => {
            return (
              <Text style={styles.foodName}>
                - {food.name} - {food.quantity}
              </Text>
            );
          })}
        </View>
      </ScrollView>
      <Text style={{ alignSelf: "center", color: "#303030", marginBottom: 4 }}>
        {option == 0 ? "Opção 1" : "Opção 2"}
      </Text>
      <View style={styles.elipseIndicator}>
        <Image
          source={
            option == 0
              ? require("../assets/ActiveElipse.png")
              : require("../assets/InactiveElipse.png")
          }
        />
        <Image
          style={{ marginLeft: 5 }}
          source={
            option == 1
              ? require("../assets/ActiveElipse.png")
              : require("../assets/InactiveElipse.png")
          }
        />
      </View>
    </View>
  );
}

const styles = {
  header: {
    height: 70,
    width: "100%",
    flexDirection: "row",
  },
  content: {
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
  foodName: {
    fontSize: 16,
    justifyContent: "center",
    marginLeft: 25,
    marginRight: 25,
    color: "#303030",
  },
  elipseIndicator: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 10,
  },
};
