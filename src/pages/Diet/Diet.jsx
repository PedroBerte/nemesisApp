import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import TabBar from "../../components/TabBar/TabBar";
import TopBar from "../../components/TopBar/TopBar";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { doc, getDoc } from "firebase/firestore";

import styles from "./DietStyles";

import { useAuthContext } from "../../context/AuthContext";

export default function Diet() {
  const { user } = useAuthContext();

  const [userDiet, setUserDiet] = useState([]);
  const [nextMeal, setNextMeal] = useState({});

  useEffect(() => {
    async function getDiet() {
      const userDocs = await getDoc(doc(db, "diets", user.uid));
      setUserDiet(userDocs.data().diet);
    }
    getDiet();
  }, [user]);
  useEffect(() => {
    console.warn(userDiet);
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
              <Text style={styles.nextMealTitle}>nome</Text>
              <Text style={styles.nextMealTime}> - horário</Text>
            </View>
            <Image
              style={{ marginRight: 15 }}
              source={require("../../assets/downArrow.png")}
            />
          </View>
          <View style={styles.nextMealContent}>
            <Text style={styles.nextMealText}>Descrição</Text>
          </View>
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}
