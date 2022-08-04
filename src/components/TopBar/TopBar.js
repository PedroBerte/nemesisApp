import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
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


import { useNavigation } from "@react-navigation/native";

import Modal from "react-native-modal";

import UserAccount from "../../pages/UserAccount/UserAccount";


export default function TopBar() {
  const [visible, setVisible] = useState(false);
  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");


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
        setName(userDocs.data().name);
        setGoal(userDocs.data().goal);
      }
    }
    getUserDocs();
  }, [user]);


  useEffect(() => {
    if (goal == "P") {
      setGoal("Perdendo Peso! 🏃");
    }
    if (goal == "G") {
      setGoal("Ficando Fortão! 💪");
    }
  }, [goal]);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 40, height: 50 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
      >
        <Image
          source={require("../../assets/user.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        hideModalContentWhileAnimating={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={500}
        animationOutTiming={500}
        style={{ justifyContent: "flex-start", margin: 10 }}
        backdropOpacity={0.45}
      >
        <View style={styles.modal}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 15,
              paddingTop: 15,
              paddingBottom: 10,
              flexDirection: "row",
            }}
          > 
            <View style={{ paddingEnd: 10 }}>
              <Image
                source={require("../../assets/PerfilIcon.png")}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
              />
            </View>

            <View style={{ flexDirection: "column" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#303030",
                  fontSize: 14,
                  marginBottom: 4,
                }}
              >
                {name}
              </Text>

              <Text style={{ color: "#303030", fontSize: 11 }}>
                {goal}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
              paddingBottom: 10,
            }}
          >
            <View style={{ paddingRight: 20 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
              <Text style={{ color:'#45C4B0', fontSize: 12 }}>Configurações</Text>
            </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => logout()}>
              <Text style={{ color:'#FF0000', fontSize: 12  }}>Finalizar Sessão</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
  },

  modal: {
    backgroundColor: "#fff",
    borderRadius: 6,
    alignSelf: "flex-end",
    marginTop: 60,
  },
});
