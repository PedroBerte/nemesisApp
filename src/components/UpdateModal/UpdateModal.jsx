import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import ModalSelector from "react-native-modal-selector";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import {
  heightList,
  weightList,
  gymAvail,
  gymFreq,
} from "../../pages/Register/UserStep/Wordlists";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function UpdateModal({ get, set }) {
  const [height, setHeight] = useState(0);
  const [newHeight, setNewHeight] = useState(0);

  const [weight, setWeight] = useState(0);
  const [newWeight, setNewWeight] = useState(0);

  const [freq, setFreq] = useState(0);
  const [rightFreq, setRightFreq] = useState(0);
  const [newFreq, setNewFreq] = useState(0);
  const [gymAvailability, setGymAvailability] = useState(false);

  const [gymDays, setGymDays] = useState("GYM-DAYS-3");

  const { user, setUser } = useContext(AuthContext);

  const userCollectionRef = collection(db, "users");

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
        setWeight(userDocs.data().weight);
        setHeight(userDocs.data().height);
        setFreq(userDocs.data().gymFreq);
        setGymDays(userDocs.data().gymDays);
        setGymAvailability(userDocs.data().gymAvail);
      }
    }
    getUserDocs();
  }, [user]);

  useEffect(() => {
    if (freq == "GYM-FREQ-S") {
      setRightFreq("Sim");
    } else {
      setRightFreq("Não");
    }
  }, []);

  return (
    <Modal
      isVisible={get}
      onBackdropPress={() => set(false)}
      onBackButtonPress={() => set(false)}
      hideModalContentWhileAnimating={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View style={styles.modalBody}>
        <View style={styles.modalHeader}>
          <View>
            <Text style={styles.modalHeaderTitle}>Novos Parâmetros:</Text>
          </View>
          <TouchableOpacity onPress={() => set(false)}>
            <Image
              style={styles.modalCloseIcon}
              source={require("../../assets/closeModalIcon.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.selectorBox}>
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <ModalSelector
              initValue="Altura"
              style={styles.selectModal}
              selectStyle={styles.modalSelectStyle}
              animationType="fade"
              data={heightList}
              onChange={(v) => setRegisterHeight(v.value)}
            />
            <View style={{ flexDirection: "row", paddingLeft: 5 }}>
              <Text>Atual: </Text>
              <Text style={{ fontWeight: "bold" }}>{height}cm</Text>
            </View>
          </View>
          <View style={{ flexDirection: "column" }}>
            <ModalSelector
              initValue="Peso"
              style={styles.selectModal}
              selectStyle={styles.modalSelectStyle}
              animationType="fade"
              data={weightList}
              onChange={(v) => setRegisterWeight(v.value)}
            />
            <View style={{ flexDirection: "row", paddingLeft: 5 }}>
              <Text>Atual: </Text>
              <Text style={{ fontWeight: "bold" }}>{weight}Kg</Text>
            </View>
          </View>
        </View>
        <ModalSelector
          initValue="Alguma academia disponível?"
          style={{
            width: "100%",
            alignSelf: "center",
            display: "flex",
            paddingHorizontal: "7%",
          }}
          selectStyle={styles.modalSelectStyle}
          animationType="fade"
          data={gymAvail}
          onChange={(v) => setGymAvailability(v.value)}
        />
        <View>
          <View style={{ flexDirection: "row", paddingLeft: "8%" }}>
            <Text>Atual: </Text>
            <Text style={{ fontWeight: "bold" }}>{rightFreq}</Text>
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ paddingLeft: "8%", paddingBottom: 15 }}>
            Número de treinos: {gymDays.replace("GYM-DAYS-", "")}
          </Text>
          <View style={{ alignItems: "center" }}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={
                gymAvailability == "GYM-N"
                  ? ["#BABABA", "#C8C8C8", "#E3E3E3"]
                  : ["#4DFD7E", "#EFFD4D", "#FD4D4D"]
              }
              style={{
                width: "90%",
                height: 15,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
              }}
            >
              <Slider
                style={styles.gymDaysSlider}
                minimumValue={3}
                maximumValue={
                  gymAvailability == "GYM-N"
                    ? Number(gymDays.replace("GYM-DAYS-", ""))
                    : 5
                }
                step={1}
                minimumTrackTintColor="transparent"
                maximumTrackTintColor="transparent"
                thumbTintColor="#808080"
                thumbImage={require("../../assets/thumbImage.png")}
                onValueChange={(value) => setGymDays(`GYM-DAYS-${value}`)}
              />
            </LinearGradient>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleChangeWorkout()}
          style={{
            alignSelf: "flex-end",
            paddingRight: "7%",
            paddingTop: 15,
            paddingBottom: 20,
          }}
        >
          <Text style={{ color: "#45C4B0", fontSize: 18 }}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = {
  modalBody: {
    backgroundColor: "white",
    borderRadius: 15,
    display: "flex",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 35,
  },
  modalHeaderTitle: {
    fontSize: 22,
    marginTop: 18,
    marginLeft: 18,
  },
  modalCloseIcon: {
    marginRight: 24,
    marginTop: 18,
  },
  selectModal: {
    width: 150,
    height: 50,
  },
  selectorBox: {
    justifyContent: "space-between",
    paddingLeft: "7%",
    paddingRight: "7%",
    flexDirection: "row",
    paddingBottom: 30,
  },
  modalSelectStyle: {
    borderWidth: 1,
    borderColor: "#c6c6c6",
    borderRadius: 10,
    height: 50,
    display: "flex",
    justifyContent: "center",
  },
  gymDaysSlider: {
    width: "100%",
  },
};

export default UpdateModal;
