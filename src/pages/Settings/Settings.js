import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";

import SettingsStyles from "./SettingsStyles";

import TopBar from "../../components/TopBar/TopBar";
import TabBar from "../../components/TabBar/TabBar";

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
import { AuthContext } from "../../context/AuthContext";

import Icon from "react-native-vector-icons/FontAwesome5";
import IconAnt from "react-native-vector-icons/Fontisto";
import Modal from "react-native-modal";
import Toast, { BaseToast } from "react-native-toast-message";
import moment from "moment";

export default function Settings() {
  moment().format();
  const [userVisible, setUserVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [workout, setWorkout] = useState("");
  const [goal, setGoal] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [sex, setSex] = useState("");

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: "#EBE143" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 17,
          fontWeight: "bold",
        }}
        text2Style={{
          fontSize: 13,
          fontWeight: "400",
        }}
      />
    ),
  };

  const changePassword = () => {
    Toast.show({
      type: "success",
      text1: "Um email foi lhe enviado",
      text2: "Siga as instruçôes para alterar sua senha",
    });
  };

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
        setEmail(userDocs.data().email);
        setDate(userDocs.data().date);
        setWeight(userDocs.data().weight);
        setHeight(userDocs.data().height);
        setWorkout(userDocs.data().workouts);
        setGoal(userDocs.data().goal);
        setSex(userDocs.data().sex);
      }
    }
    getUserDocs();
  }, [user]);

  useEffect(() => {
    if (sex == "M") {
      setSex("Masculino");
    }
    if (sex == "N") {
      setSex("Feminino");
    }
    if (sex == "NA") {
      setSex("Indefinido");
    }
    if (goal == "P") {
      setGoal("Perda de Peso");
    }
    if (goal == "G") {
      setGoal("Ganhar Massa");
    }
  }, [sex]);

  return (
    <>
      <SafeAreaView style={SettingsStyles.container}>
        <TopBar />
        <Toast topOffset={10} config={toastConfig} />
        <Modal
          isVisible={userVisible}
          onBackdropPress={() => setUserVisible(false)}
          onBackButtonPress={() => setUserVisible(false)}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInTiming={500}
          animationOutTiming={500}
        >
          <View style={SettingsStyles.modal}>
            <View style={SettingsStyles.modalTop}>
              <Text style={SettingsStyles.headerText}>
                Informaçôes da conta:
              </Text>
              <Image
                source={require("../../assets/logo.png")}
                style={SettingsStyles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={SettingsStyles.modalImage}>
              <Image
                source={require("../../assets/PerfilIcon.png")}
                style={{ width: 105, height: 105, marginBottom: 5 }}
                resizeMode="contain"
              />
              <Text style={{ marginBottom: 30 }}>{name}</Text>
            </View>
            <View style={SettingsStyles.modalData}>
              <Text style={{ fontWeight: "bold" }}>Email: </Text>
              <Text>{email}</Text>
            </View>

            <View style={SettingsStyles.modalData}>
              <Text style={{ fontWeight: "bold" }}>Data de nascimento: </Text>
              <Text>{moment(date).format("DD/MM/YYYY")}</Text>
            </View>

            <View style={SettingsStyles.modalData}>
              <Text style={{ fontWeight: "bold" }}>Sexo: </Text>
              <Text>{sex}</Text>
            </View>

            <View style={SettingsStyles.modalData}>
              <Text style={{ fontWeight: "bold" }}>Peso: </Text>
              <Text>{weight}Kg</Text>
            </View>

            <View style={SettingsStyles.modalData}>
              <Text style={{ fontWeight: "bold" }}>Objetivo: </Text>
              <Text>{goal}</Text>
            </View>

            <View style={SettingsStyles.modalData}>
              <Text style={{ fontWeight: "bold" }}>Altura: </Text>
              <Text>{height}cm</Text>
            </View>
          </View>
        </Modal>

        <Modal
          isVisible={deleteVisible}
          onBackdropPress={() => setDeleteVisible(false)}
          onBackButtonPress={() => setDeleteVisible(false)}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInTiming={500}
          animationOutTiming={500}
        >
          <View style={SettingsStyles.modal}>
            <Text style={SettingsStyles.headerText}>
              Você tem certeza disso?
            </Text>
            <Text style={SettingsStyles.modalSubtitle}>
              Se você apagar a sua conta, nunca mais terá acesso à ela!
            </Text>

            <View style={{}}></View>
            <View
              style={{
                alignContent: "center",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <TextInput
                placeholder="Nome Completo"
                placeholderTextColor="#b3b3b3"
                style={SettingsStyles.textInput}
                onChangeText={(text) => setConfirmEmail(text)}
              />
            </View>
          </View>
        </Modal>

        <View style={SettingsStyles.content}>
          <Text style={SettingsStyles.text}>Configurações da Conta</Text>

          <View style={SettingsStyles.personalInformationView}>
            {name == "" ? (
              <Skeleton />
            ) : (
              <>
                <Image
                  source={require("../../assets/PerfilIcon.png")}
                  style={SettingsStyles.userImage}
                  resizeMode="contain"
                />

                <View style={SettingsStyles.data}>
                  <Text style={SettingsStyles.userName}>{name}</Text>

                  <Text style={SettingsStyles.userEmail}>{email}</Text>

                  <Text style={SettingsStyles.userBornDate}>
                    Nascido em: {moment(date).format("DD/MM/YYYY")}
                  </Text>

                  <View style={{ alignSelf: "flex-end" }}>
                    <TouchableOpacity
                      onPress={() => {
                        setUserVisible(true);
                      }}
                    >
                      <Text style={SettingsStyles.modalButton}>
                        Ler mais...
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          </View>

          <View>
            <View style={SettingsStyles.changePasswordView}>
              <TouchableOpacity onPress={changePassword}>
                <View style={{ flexDirection: "row" }}>
                  <Icon name="lock" size={20} />
                  <Text style={SettingsStyles.tittleText}>Alterar senha</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={SettingsStyles.spacer} />

            <View>
              <View style={SettingsStyles.deleteAccountView}>
                <TouchableOpacity
                  onPress={() => {
                    setDeleteVisible(true);
                  }}
                >
                  <View style={{ flexDirection: "row" }}>
                    <IconAnt name="close-a" size={20} />
                    <Text style={SettingsStyles.tittleText}>Excluir conta</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <TabBar />
    </>
  );
}
