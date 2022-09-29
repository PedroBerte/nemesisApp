import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

import styles from "./DietStyles";

import { useAuthContext } from "../../context/AuthContext";

import moment from "moment";
import MealBox from "./components/MealBox";

export default function Diet() {
  moment().format();
  const { user } = useAuthContext();

  const [userDiet, setUserDiet] = useState("");
  const [nextMeal, setNextMeal] = useState("");
  const [option, setOption] = useState(0);
  const [seeMoreIsPressed, setSeeMoreIsPressed] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(100));

  const handlePress = () => {
    if (!seeMoreIsPressed) {
      Animated.timing(animation, {
        toValue: 200,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 100,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    setSeeMoreIsPressed(!seeMoreIsPressed);
  };

  useEffect(() => {
    async function getDiet() {
      const userDocs = await getDoc(doc(db, "diets", user.uid));
      setUserDiet(userDocs.data().diet);
    }
    getDiet();
  }, [user]);

  useEffect(() => {
    if (userDiet != "") {
      if (
        userDiet.filter((meal) => meal.time > moment().format("HH:mm"))
          .length == 0
      ) {
        setNextMeal(userDiet[0]);
      } else {
        const dietFiltered = userDiet.filter(
          (meal) => meal.time > moment().format("HH:mm")
        );
        setNextMeal(dietFiltered[0]);
      }
    }
  }, [userDiet]);

  return (
    <>
      <TopBar />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Dieta</Text>
        <Text style={styles.text}>Próxima Refeição:</Text>
        <Animated.View
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: "100%",
            height: animation,
            backgroundColor: "#F5F5F5",
            borderColor: "#DCDCDC",
            borderWidth: 1,
            borderRadius: 10,
          }}
        >
          <View style={styles.nextMealHeader}>
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <Text style={styles.nextMealTitle}>
                {nextMeal != "" ? nextMeal.meal : <></>}
              </Text>
              <Text style={styles.nextMealTime}>
                {" "}
                - {nextMeal != "" ? nextMeal.time : <></>}
              </Text>
            </View>
            <TouchableOpacity onPress={() => handlePress()}>
              <Image
                style={{ marginRight: 15 }}
                source={require("../../assets/downArrow.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.nextMealContent}>
            <Text style={styles.nextMealText} numberOfLines={1}>
              {nextMeal != "" ? (
                <>
                  {nextMeal.option[option].foods.map((food, i) => {
                    return <Text key={i}>{food.name}, </Text>;
                  })}
                </>
              ) : (
                <></>
              )}
            </Text>
          </View>
        </Animated.View>
        <Text style={styles.text}>Todas as refeições: </Text>
        <View style={styles.mealsBody}>
          {userDiet != "" ? (
            <>
              {userDiet.map((meal, i) => {
                return <MealBox key={i} snack={meal} />;
              })}
            </>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}
