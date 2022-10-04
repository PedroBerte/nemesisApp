import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  Animated,
  Pressable,
} from "react-native";

import { useAnimationState, MotiView } from "moti";

export default function MealBox({ snack }) {
  const [snackArrowIsPressed, setSnackArrowIsPressed] = useState(false);
  const [option, setOption] = useState(0);
  const [bodyWidth, setBodyWidth] = useState(0);

  function getIcon() {
    switch (snack.meal) {
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

  function checkScrollIndicatorPosition({ nativeEvent }) {
    function isCloseToEnd({ layoutMeasurement, contentOffset, contentSize }) {
      return (
        layoutMeasurement.width + contentOffset.x >= contentSize.width - 150
      );
    }
    function isCloseToStart({ contentOffset }) {
      return contentOffset.x == 0;
    }
    if (isCloseToStart(nativeEvent)) {
      setOption(0);
    }
    if (isCloseToEnd(nativeEvent)) {
      setOption(1);
    }
  }

  const heightAnimated = useAnimationState({
    onOpen: {
      height: 200,
    },
    onClose: {
      height: 70,
    },
  });

  const handleSnackButtonPress = () => {
    if (snackArrowIsPressed) {
      heightAnimated.transitionTo("onClose");
      setSnackArrowIsPressed(false);
    } else {
      heightAnimated.transitionTo("onOpen");
      setSnackArrowIsPressed(true);
    }
  };

  return (
    <MotiView
      style={styles.body}
      state={heightAnimated}
      transition={{
        type: "timing",
        duration: 500,
      }}
    >
      <View
        onLayout={(event) => {
          setBodyWidth(event.nativeEvent.layout);
        }}
        style={styles.header}
      >
        <Image source={getIcon()} style={styles.icon} />
        <View style={styles.textsBody}>
          <Text style={styles.mealName}>{snack.meal}</Text>
          <Text style={styles.mealTime}>{snack.time}</Text>
        </View>
        <Pressable style={styles.arrowBody} onPressIn={handleSnackButtonPress}>
          <Image source={require("../../../assets/downArrow.png")} />
        </Pressable>
      </View>

      <ScrollView
        disableIntervalMomentum={true}
        horizontal
        snapToInterval={bodyWidth.width}
        style={styles.content}
        showsHorizontalScrollIndicator={false}
        onScroll={({ nativeEvent }) =>
          checkScrollIndicatorPosition({ nativeEvent })
        }
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <ScrollView
          nestedScrollEnabled
          style={{
            width: bodyWidth.width,
          }}
        >
          {snack.option[0].foods.map((food, index) => (
            <Text key={index} style={styles.foodName}>
              {food.name} - {food.quantity}
            </Text>
          ))}
        </ScrollView>
        <ScrollView
          nestedScrollEnabled
          style={{
            width: bodyWidth.width,
          }}
        >
          {snack.option[1].foods.map((food, index) => {
            return (
              <Text key={index} style={styles.foodName}>
                {food.name} - {food.quantity}
              </Text>
            );
          })}
        </ScrollView>
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
    </MotiView>
  );
}

const styles = {
  body: {
    width: "100%",
    backgroundColor: "#F5F5F5",
    borderColor: "#DCDCDC",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "column",
    overflow: "hidden",
    marginBottom: 20,
    height: 70,
  },
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
