import React, { useState, useEffect, useContext } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
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
import { collection, deleteDoc, doc, getDoc } from "firebase/firestore";

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

  const userCollectionRef = collection(db, "users");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [workout, setWorkout] = useState("");
  const [goal, setGoal] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [sex, setSex] = useState("");

  const [attentionText, setAttentionText] = useState(
    "Insira seu Email para confirmar à exclusão"
  );
  const [shadowColor, setShadowColor] = useState("#b3b3b3");
  const [textColor, setTextColor] = useState("#000");
  const { user, setUser } = useContext(AuthContext);

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

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user == undefined) {
      () => navigation.navigate("Login");
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

  async function handleDeleteUser() {
    setUser(auth.currentUser);
    // console.warn(user.uid);
    const uid = user.uid;
    if (confirmEmail == email) {
      deleteUser(user)
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Conta Apagada com Sucesso!",
          });
        })
        .catch((error) => {
          console.warn(error);
          return;
        });
      await deleteDoc(doc(db, "users", uid));
      setTimeout(() => {
        () => navigation.navigate("Login");
      }, 1500);
    } else {
      IncorrectEmail();
    }
  }

  function changePassword() {
    sendPasswordResetEmail(auth, email).then(() => {
      Toast.show({
        type: "success",
        text1: "Um email foi lhe enviado",
        text2: "Siga as instruçôes para alterar sua senha",
      });
    });
  }

  function closeModal() {
    setAttentionText("Insira seu Email para confirmar à exclusão");
    setDeleteVisible(false);
    setShadowColor("#b3b3b3");
    setTextColor("#000");
  }

  function IncorrectEmail() {
    setAttentionText("Email Incorreto!");
    setShadowColor("#C44545");
    setTextColor("#C44545");
  }

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
          backdropOpacity={0.85}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingBottom: 30,
              borderRadius: 10,
            }}
          >
            <View style={SettingsStyles.modalTop}>
              <Text style={SettingsStyles.headerText}>
                Informações da conta:
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
              <Text
                style={{ marginBottom: 30, fontSize: 17, fontWeight: "bold" }}
              >
                {name}
              </Text>
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
          onBackdropPress={() => closeModal()}
          onBackButtonPress={() => closeModal()}
          hideModalContentWhileAnimating={true}
          animationIn="fadeIn"
          animationOut="fadeOut"
          animationInTiming={500}
          animationOutTiming={500}
          backdropOpacity={0.85}
        >
          <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 12,
                  paddingBottom: 50,
                  marginHorizontal: "4%",
                  borderWidth: 2,
                  borderColor: shadowColor,
                }}
              >
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
                    placeholder={email}
                    placeholderTextColor="#b3b3b3"
                    style={{
                      width: "90%",
                      height: 50,
                      backgroundColor: "#FFFFFF",
                      borderRadius: 10,
                      alignSelf: "center",
                      shadowColor: shadowColor,
                      paddingLeft: 10,
                      shadowOffset: {
                        width: 6,
                        height: 6,
                      },
                      elevation: 10,
                      shadowOpacity: 0.2,
                      borderColor: shadowColor,
                      borderWidth: 1,
                    }}
                    onChangeText={(text) => setConfirmEmail(text)}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      alignSelf: "center",
                      paddingTop: 10,
                      fontWeight: "bold",
                      color: textColor,
                    }}
                  >
                    {attentionText}
                  </Text>
                </View>

                <View style={SettingsStyles.modalButtons}>
                  <TouchableOpacity
                    style={SettingsStyles.deleteAccountButton}
                    onPress={() => handleDeleteUser()}
                  >
                    <Text style={SettingsStyles.cancelText}>Apagar Conta</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => closeModal()}
                    style={SettingsStyles.cancelButton}
                  >
                    <Text style={SettingsStyles.cancelText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </Modal>

        <View style={SettingsStyles.content}>
          <Text style={SettingsStyles.text}>Configurações da Conta</Text>

          <View style={SettingsStyles.personalInformationView}>
            {name == "" ? (
              <>
                <Skeleton width={105} height={105} borderRadius={53} />
                <View
                  style={{
                    flexDirection: "column",
                    display: "flex",
                  }}
                >
                  <Skeleton
                    width={200}
                    height={22}
                    borderRadius={10}
                    marginBottom={10}
                  />
                  <Skeleton
                    width={160}
                    height={17}
                    borderRadius={10}
                    marginBottom={10}
                  />
                  <Skeleton width={180} height={17} borderRadius={10} />
                </View>
              </>
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
              <TouchableOpacity onPress={() => changePassword()}>
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
