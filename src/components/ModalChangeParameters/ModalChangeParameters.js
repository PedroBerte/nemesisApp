import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import { useAuthContext } from "../../context/AuthContext";

import Modal from "react-native-modal";
import ModalSelector from "react-native-modal-selector";

import {
  sexList,
  heightList,
  weightList,
  goalList,
  gymFreq,
  gymAvail,
  userRes,
} from "../../pages/Register/UserStep/Wordlists";

import { onAuthStateChanged } from "firebase/auth";

import { db } from "../../services/firebase-config";
import { auth } from "../../services/firebase-config";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

export default function ModalChangeParameters({ get, set }) {
  const [height, setHeight] = useState("");
  const [newHeight, setNewHeight] = useState("");

  const [weight, setWeight] = useState("");
  const [newWeight, setNewWeight] = useState("");

  const [gymAvail, setGymAvail] = useState("");
  const [newGymAvail, setNewGymAvail] = useState("");

  const [gymDays, setGymDays] = useState("");
  const [newGymDays, setNewGymDays] = useState("");

  const { user, setUser } = useAuthContext();
  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    async function getUserDocs() {
      if (user != undefined) {
        const userDocs = await getDoc(doc(db, "users", user.uid));
        setHeight(userDocs.data().height);
        setWeight(userDocs.data().weight);
        setGymAvail(userDocs.data().gymAvail);
        setGymDays(userDocs.data().gymDays);
      }
    }
    getUserDocs();
  }, [user]);

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
      backdropOpacity={0.85}
    >
      <View style={styles.modalBody}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Novos Parametros</Text>
          <TouchableOpacity onPress={() => set(false)}>
            <Image
              style={styles.modalCloseIcon}
              source={require("../../assets/closeModalIcon.png")}
            />
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.flexHeightAndWeight}>
            <View>
              <ModalSelector
                initValue="Altura"
                selectStyle={styles.modalSelectStyle}
                animationType="fade"
                data={heightList}
                onChange={(v) => setNewHeight(v.value)}
              />
              <Text>Atual: {height}</Text>
            </View>
            <View>
              <ModalSelector
                initValue="Peso"
                selectStyle={styles.modalSelectStyle}
                animationType="fade"
                data={weightList}
                onChange={(v) => setNewWeight(v.value)}
              />
              <Text>Atual: {weight}</Text>
            </View>
          </View>
          <ModalSelector
            initValue="Alguma academia disponível?"
            selectStyle={styles.modalBigSelectStyle}
            animationType="fade"
            data={weightList}
            onChange={(v) => setUserRes(v.value)}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBody: {
    backgroundColor: "#fff",
  },
  modalHeader: {
    display: "flex",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  modalTitle: {
    marginLeft: 20,
    marginTop: 20,
    fontSize: 20,
    color: "#303030",
  },
  modalCloseIcon: {
    marginRight: 20,
    marginTop: 20,
  },
  modalSelectStyle: {
    borderWidth: 1,
    borderColor: "#c6c6c6",
    borderRadius: 10,
    height: 50,
    display: "flex",
    justifyContent: "center",
    width: 140,
  },
  modalBigSelectStyle: {
    borderWidth: 1,
    borderColor: "#c6c6c6",
    borderRadius: 10,
    height: 50,
    display: "flex",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
  },
  flexHeightAndWeight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
});
