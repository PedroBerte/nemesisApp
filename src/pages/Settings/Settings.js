<<<<<<< HEAD
import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
=======
import React, { useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
>>>>>>> c141249f6295996cbe79095347e6cbb8ad0054e6

import SettingsStyles from "./SettingsStyles";

import Modal from "react-native-modal";
<<<<<<< HEAD
import Toast from "react-native-toast-message";

import { auth, db } from "./../../services/firebase-config";
import { setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";

export default function Settings() {

  const [accountVisible, setAccountVisible] = useState(false);
  const changePassword = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bornDate, setBornDate] = useState("");
  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  },[])

  return (
    <>
    <SafeAreaView style={SettingsStyles.container}>
    <View style={SettingsStyles.toast}>
     <Toast/>
     </View>
     <Modal
     isVisible={accountVisible}
     onBackdropPress={() => setAccountVisible(false)}
     onBackButtonPress={() => setAccountVisible(false)}
     hideModalContentWhileAnimating={true}
     animationIn="fadeIn"
     animationOut="fadeOut"
     animationInTiming={500} 
     animationOutTiming={500}
     >
=======
import TopBar from "../../components/TopBar/TopBar";
import TabBar from "../../components/TabBar/TabBar";

export default function Settings() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TopBar />
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        hideModalContentWhileAnimating={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={500}
        animationOutTiming={500}
      >
        <View style={SettingsStyles.modal}>
          <View style={SettingsStyles.modalTop}>
            <Text style={SettingsStyles.headerText}>Informações da conta:</Text>
            <Image
              source={require("../../assets/logo.png")}
              style={SettingsStyles.logo}
              resizeMode="contain"
            />
          </View>
>>>>>>> c141249f6295996cbe79095347e6cbb8ad0054e6

          <View style={SettingsStyles.modalImage}>
            <Image
              source={require("../../assets/PerfilIcon.png")}
              style={{ width: 105, height: 105, marginBottom: 5 }}
              resizeMode="contain"
            />
            <Text style={{ marginBottom: 30 }}>Leonardo Enrico Luccarelli</Text>
          </View>
          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Email: </Text>
            <Text>leoluccarelli7@gmail.com</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Data de nascimento: </Text>
            <Text>08/06/2005</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Sexo: </Text>
            <Text>Masculino</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Peso: </Text>
            <Text>83Kg</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Objetivo: </Text>
            <Text>Perda de Peso</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Altura: </Text>
            <Text>183cm</Text>
          </View>
        </View>
      </Modal>

      <View style={SettingsStyles.container}>
        <Text style={SettingsStyles.text}>Configurações da Conta</Text>

        <View style={SettingsStyles.personalInformationView}>
          <Image
            source={require("../../assets/PerfilIcon.png")}
            style={SettingsStyles.userImage}
            resizeMode="contain"
          />

          <Text style={SettingsStyles.userName}>Leonardo Luccarelli</Text>

          <Text style={SettingsStyles.userEmail}>leoluccarelli7@gmail.com</Text>

          <Text style={SettingsStyles.userBornDate}>
            Nascido em: 08/06/2005
          </Text>

          <TouchableOpacity
<<<<<<< HEAD
            onPress={() => {setAccountVisible(true)}}
=======
            onPress={() => {
              setVisible(true);
            }}
>>>>>>> c141249f6295996cbe79095347e6cbb8ad0054e6
          >
            <Text style={SettingsStyles.modalButton}>Ler mais...</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={SettingsStyles.changePasswordView}>
            <Text style={SettingsStyles.tittleText}>Alterar senha:</Text>

<<<<<<< HEAD
            <TouchableOpacity onPress={changePassword} style={SettingsStyles.changeDeleteButton}>
              <Text style={SettingsStyles.buttonText}>
                Alterar Senha
              </Text>
=======
            <TouchableOpacity style={SettingsStyles.changeDeleteButton}>
              <Text style={SettingsStyles.buttonText}>Alterar Senha</Text>
>>>>>>> c141249f6295996cbe79095347e6cbb8ad0054e6
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 25 }}>
            <Text style={SettingsStyles.detailsText}>
              Enviaremos um e-mail para você alterar a sua senha.
            </Text>
          </View>

          <View style={SettingsStyles.spacer} />

          <View>
            <View style={SettingsStyles.deleteAccountView}>
              <Text style={SettingsStyles.tittleText}>Excluir conta:</Text>

              <TouchableOpacity style={SettingsStyles.changeDeleteButton}>
                <Text style={SettingsStyles.buttonText}>Excluir conta</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginLeft: 25, width: "62%" }}>
              <Text style={SettingsStyles.detailsText}>
                Exclua todos os seus dados, preferências e acesso a conta.
              </Text>
            </View>
          </View>
        </View>
      </View>
<<<<<<< HEAD
      </SafeAreaView>
=======
      <TabBar />
>>>>>>> c141249f6295996cbe79095347e6cbb8ad0054e6
    </>
  );
}
