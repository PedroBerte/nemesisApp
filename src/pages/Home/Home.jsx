import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import UserAccount from "../UserAccount/UserAccount";
import TopBar from "../../components/TopBar/TopBar";
import TabBar from "../../components/TabBar/TabBar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Button from "../../components/Button/Button";
import TaskBox from "../../components/TaskBox/TaskBox";
import { AuthContext } from "../../context/AuthContext";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import Skeleton from "../../components/Skeleton/Skeleton";
import moment from "moment";

export default function Home() {
  moment().format();

  const now = new Date();
  const dateArray = new Date();
  const dayMonth = dateArray.getDate();
  const monthName = new Array(
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "agosto",
    "outubro",
    "novembro",
    "dezembro"
  );
  const dayWeeknd = new Array(
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado"
  );
  const [name, setName] = useState("");
  const [bornDate, setBornDate] = useState(0);
  const [age, setAge] = useState(0);
  const [ageProgress, setAgeProgress] = useState(0);
  const [height, setHeight] = useState(0);
  const [heightProgress, setHeightProgress] = useState(0);
  const [weight, setWeight] = useState(0);
  const [weightProgress, setWeightProgress] = useState(0);
  const [workout, setWorkout] = useState([]);

  const { user, setUser } = useContext(AuthContext);
  const userCollectionRef = collection(db, "users");

  const [scrollY, setScrollY] = useState(new Animated.Value(0));

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user == undefined) {
      navigation.navigate("Login");
    }
    async function getUserDocs() {
      if (user != undefined) {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        setBornDate(userDocs.data().date);
        setWeight(userDocs.data().weight);
        setHeight(userDocs.data().height);
        setWorkout(userDocs.data().workouts);
        setName(userDocs.data().name);
      }
    }
    getUserDocs();
  }, [user]);

  useEffect(() => {
    if (bornDate != "") {
      setAge(moment().diff(bornDate, "years"));
    }
  }, [dateArray]);

  useEffect(() => {
    handleSetHeightProgressBar();
  }, [height]);

  useEffect(() => {
    handleSetAgeProgressBar();
  }, [age]);

  useEffect(() => {
    handleSetWeightProgressBar();
  }),
    [weight];

  function handleSetHeightProgressBar() {
    var heightFormated = height - 145;

    var a = 75;
    var b = 100 * heightFormated;
    var result = b / a;
    setHeightProgress(result);
  }

  function handleSetAgeProgressBar() {
    var ageFormated = age - 12;

    var a = 68;
    var b = 100 * ageFormated;
    var result = b / a;
    setAgeProgress(result);
  }

  function handleSetWeightProgressBar() {
    var weightFormated = weight - 40;

    var a = 160;
    var b = 100 * weightFormated;
    var result = b / a;
    setWeightProgress(result);
  }

  return (
    <>
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: "#FFF",
            height: scrollY.interpolate({
              inputRange: [0, 80],
              outputRange: [90, 0],
              extrapolate: "clamp",
            }),
            opacity: scrollY.interpolate({
              inputRange: [0, 60, 80],
              outputRange: [1, 1, 0],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <TopBar />
      </Animated.View>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#FFF" }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { y: scrollY },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.container}>
          <View style={{ paddingBottom: 30 }}>
            <Text style={styles.text}>{`Olá, ${name.split(" ")[0]}`}</Text>
            <Text style={styles.bottomText}>
              {dayWeeknd[now.getDay()]}, {dayMonth} de{" "}
              {monthName[now.getMonth()]} - Hoje é Leg Day!
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Image source={require("../../assets/Man.png")} />

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: 30,
              }}
            >
              <Text>Idade: {age} anos</Text>
              <ProgressBar value={ageProgress} color="red" width="100%" />
              <Text style={styles.dtText}>
                Altura: {String(height / 100).replace(".", ",")} m
              </Text>
              <ProgressBar
                value={heightProgress}
                color="#05FF00"
                width="100%"
              />
              <Text style={styles.dtText}>Peso {weight} Kg</Text>
              <ProgressBar value={weightProgress} color="yellow" width="100%" />
              <Button style={styles.btnHome}>Atualize suas Medidas</Button>
            </View>
          </View>

          <View style={styles.spacer} />
          <Text style={styles.title}>Central de Lembretes:</Text>

          <TaskBox hour={"6:30"}>Café da Manhã</TaskBox>
          <TaskBox hour={"6:30"}>Treino</TaskBox>
          <TaskBox hour={"6:30"}>Colação - Pós treino</TaskBox>
          <TaskBox hour={"6:30"}>Almoço</TaskBox>
          <TaskBox hour={"6:30"}>Almoço</TaskBox>
          <TaskBox hour={"6:30"}>Almoço</TaskBox>
          <TaskBox hour={"6:30"}>Almoço</TaskBox>
          <TaskBox hour={"6:30"}>Almoço</TaskBox>
          <TaskBox hour={"6:30"}>Almoço</TaskBox>
          <TaskBox hour={"6:30"}>Almoço</TaskBox>
          <TaskBox hour={"6:30"}>Almoço</TaskBox>
        </View>
      </ScrollView>
      <TabBar />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: "white",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#303030",
  },
  dtText: {
    paddingTop: 20,
  },
  btnHome: {
    width: "75%",
    height: 35,
    backgroundColor: "#45c4b0",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "flex-end",
    marginTop: 20,
  },
  spacer: {
    width: "100%",
    backgroundColor: "rgba(29, 29, 29, 0.08)",
    height: 1,
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#303030",
  },
});
