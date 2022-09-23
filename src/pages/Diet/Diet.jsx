import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
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

  useEffect(() => {
    async function getDiet() {
      const userDocs = await getDoc(doc(db, "diets", user.uid));
      setUserDiet(userDocs.data().diet);
    }
    getDiet();
  }, [user]);

  useEffect(() => {
    console.warn(moment().format("HH:mm"));
    if (userDiet != "") {
      if (
        userDiet.filter((meal) => meal.time < moment().format("HH:mm")) == ""
      ) {
        setNextMeal(userDiet[0]);
      } else {
        const mealsFiltered = userDiet.filter(
          (meal) => meal.time > moment().format("HH:mm")
        );
        setNextMeal(mealsFiltered[0]);
      }
    }
  }, [userDiet]);

  return (
    <>
      <TopBar />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Dieta</Text>
        <Text style={styles.text}>Próxima Refeição:</Text>
        <View style={styles.nextMealBody}>
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
            <Image
              style={{ marginRight: 15 }}
              source={require("../../assets/downArrow.png")}
            />
          </View>
          <View style={styles.nextMealContent}>
            <Text style={styles.nextMealText}>
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
        </View>
        <Text style={styles.text}>Todas as refeições: </Text>
        <View style={styles.mealsBody}>
          {userDiet != "" ? (
            <>
              {userDiet.map((meal) => {
                return <MealBox meal={meal} />;
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
