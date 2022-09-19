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
import {
  heightList,
  weightList,
  gymAvail,
  gymFreq,
} from "../Register/UserStep/Wordlists";
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
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";

function UpdateModal({ get, set }) {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [freq, setFreq] = useState(0);
  const [rightFreq, setRightFreq] = useState(0);

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
      }
    }
    if (gymFreq == "GYM-FREQ-N") {
      setRightFreq("Não");
    } else {
      setRightFreq("Sim");
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
          <View style={{ flexDirection: "column" }}>
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
              <Text style={{ fontWeight: "bold" }}> {height}cm</Text>
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
              <Text style={{ fontWeight: "bold" }}> {weight}Kg</Text>
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
        <View style={{ paddingLeft: "7%" }}>
          <View style={{ flexDirection: "row", paddingLeft: 5 }}>
            <Text>Atual: </Text>
            <Text style={{ fontWeight: "bold" }}> {rightFreq}</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleChangeWorkout()}
          style={{
            alignSelf: "flex-end",
            paddingRight: "7%",
            paddingTop: 35,
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
    width: 130,
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
};

export default UpdateModal;
