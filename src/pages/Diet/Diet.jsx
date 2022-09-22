import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

import styles from "./DietStyles";

import { useAuthContext } from "../../context/AuthContext";

import moment from "moment";

export default function Diet() {
  moment().format();
  const { user } = useAuthContext();

  const [userDiet, setUserDiet] = useState(null);
  const [nextMeal, setNextMeal] = useState(null);
  const [option, setOption] = useState(0);

  useEffect(() => {
    async function getDiet() {
      const userDocs = await getDoc(doc(db, "diets", user.uid));
      setUserDiet(userDocs.data().diet);
    }
    getDiet();
  }, [user]);

  useEffect(() => {
    if (userDiet != null) {
      console.log(userDiet, "oi leo, bão");
      setNextMeal(
        userDiet.filter((meal) => meal.time > moment().format("HH:mm"))
      );
    }
  }, [userDiet]);

  return (
    <>
      <TopBar />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Dieta</Text>
        <Text style={styles.text}>Próxima Refeição:</Text>
        <View
          style={styles.nextMealBody}
          onPress={() => {
            option == 0 ? option++ : option--;
          }}
        >
          <View style={styles.nextMealHeader}>
            <View style={{ flexDirection: "row", marginLeft: 15 }}>
              <Text style={styles.nextMealTitle}>
                {nextMeal != null ? nextMeal[0].meal : <></>}
              </Text>
              <Text style={styles.nextMealTime}>
                {" "}
                - {nextMeal != null ? nextMeal[0].time : <></>}
              </Text>
            </View>
            <Image
              style={{ marginRight: 15 }}
              source={require("../../assets/downArrow.png")}
            />
          </View>
          <View style={styles.nextMealContent}>
            <Text style={styles.nextMealText}>
              {nextMeal != null ? (
                <>
                  {nextMeal[0].option[option].foods.map((food, i) => {
                    return <Text key={i}>{food.name}, </Text>;
                  })}
                </>
              ) : (
                <></>
              )}
            </Text>
          </View>
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}
