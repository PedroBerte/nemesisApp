import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import TopBar from "../../components/TopBar/TopBar";
import TabBar from "../../components/TabBar/TabBar";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import Button from "../../components/Button/Button";
import TaskBox from "../../components/TaskBox/TaskBox";
import { AuthContext } from "../../context/AuthContext";
import UpdateModal from "../../components/UpdateModal/UpdateModal";
import { useNavigation } from "@react-navigation/native";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Skeleton } from "moti/skeleton";

import moment from "moment";

export default function Home() {
  moment().format();
  const navigation = useNavigation();

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
  const [workout, setWorkout] = useState();
  const [userReminders, setUserReminders] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [updateModalIsVisible, setUpdateModalIsVisible] = useState(false);

  const { user, setUser } = useContext(AuthContext);

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
        setName(userDocs.data().name);
        setUserReminders(userDocs.data().reminders);
        setIsLoading(false);
      }
    }
    async function getWorkout() {
      if (user != undefined) {
        const userDocs = await getDoc(doc(db, "workouts", user.uid));
        setWorkout(userDocs.data().workouts);
      }
    }
    getUserDocs();
    getWorkout();
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

  const Spacer = ({ height }) => <View style={{ height: height }} />;

  return (
    <>
      <View>
        <TopBar />
        <UpdateModal set={setUpdateModalIsVisible} get={updateModalIsVisible} />
      </View>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFF" }}>
        <View style={styles.container}>
          <View style={{ paddingBottom: 30 }}>
            <Skeleton show={isLoading} colorMode="light">
              <Text style={styles.text}>{`Olá, ${name.split(" ")[0]}`}</Text>
            </Skeleton>

            <Spacer height={isLoading ? 10 : 0} />

            <Skeleton show={isLoading} colorMode="light">
              <Text style={styles.bottomText}>
                {dayWeeknd[now.getDay()]}, {dayMonth} de{" "}
                {monthName[now.getMonth() - 2]} - Hoje é dia de treino!
              </Text>
            </Skeleton>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Skeleton show={isLoading} colorMode="light">
              <Image source={require("../../assets/Man.png")} />
            </Skeleton>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                flexDirection: "column",
                marginLeft: 30,
              }}
            >
              <Skeleton show={isLoading} colorMode="light">
                <Text>Idade: {age} anos</Text>
                <ProgressBar value={ageProgress} color="red" width="100%" />
              </Skeleton>

              <Spacer height={15} />

              <Skeleton show={isLoading} colorMode="light">
                <Text>Altura: {String(height / 100).replace(".", ",")} m</Text>
                <ProgressBar
                  value={heightProgress}
                  color="#05FF00"
                  width="100%"
                />
              </Skeleton>

              <Spacer height={15} />

              <Skeleton show={isLoading} colorMode="light">
                <Text>Peso {weight} Kg</Text>
                <ProgressBar
                  value={weightProgress}
                  color="yellow"
                  width="100%"
                />
              </Skeleton>

              <Button
                style={styles.btnHome}
                onPress={() => setUpdateModalIsVisible(true)}
              >
                Atualize suas Medidas
              </Button>
            </View>
          </View>
          <View style={styles.spacer} />
          <Text style={styles.title}>Central de Lembretes:</Text>
          <View style={{ paddingBottom: 20 }}>
            {userReminders != undefined ? (
              <>
                {userReminders.map((reminder, index) => (
                  <TaskBox
                    key={index}
                    index={index}
                    hour={reminder.time}
                    userReminders={userReminders}
                    set={setUserReminders}
                  >
                    {reminder.title}
                  </TaskBox>
                ))}
              </>
            ) : (
              <>
                <Spacer height={15} />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer height={15} />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer height={15} />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer height={15} />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer height={15} />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer height={15} />
                <Skeleton width="100%" height={45} colorMode="light" />
                <Spacer height={15} />
              </>
            )}
          </View>
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
