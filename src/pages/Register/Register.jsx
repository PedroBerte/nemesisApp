import React, { Component, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../../services/firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

import styles from "./RegisterStyles";

import Statusbar from "../../components/StatusBar/StatusBar";
import InputSelect from "../../components/InputSelect/InputSelect";
import DatePicker from "../../components/DatePicker/DatePicker";

import Toast from "react-native-toast-message";
import moment from "moment";

import { heightList, sexList, weightList, goalList } from "./Wordlists";

const Register = () => {
  moment().format();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [bornDate, setBornDate] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  const [userUID, setUserUID] = useState("");

  const [isCreated, setIsCreated] = useState(false);

  function stringContainsNumber(_string) {
    return /\d/.test(_string);
  }

  function handleHeightNumber(height) {
    if (height.indexOf(".") > -1) {
      return height.replace(".", "");
    } else {
      return height;
    }
  }

  function getCurrentDate(age) {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    function formatMonth(month) {
      if (String(month).length > 1) {
        return month;
      } else {
        return `0${month}`;
      }
    }

    function formatDay(day) {
      if (String(day).length > 1) {
        return day;
      } else {
        return `0${day}`;
      }
    }

    if (age > 0) {
      return `${year - age}-${formatMonth(month)}-${formatDay(day)}`;
    } else {
      return `${year}-${formatMonth(month)}-${formatDay(day)}`;
    }
  }

  async function registerUser() {
    if (!isCreated) {
      try {
        if ((name, email, password, confirmPassword == "")) {
          Toast.show({ type: "error", text1: "Não deixe campos vazios!" });
          return;
        }
        if (stringContainsNumber(name)) {
          Toast.show({ type: "error", text1: "Insira um nome valido!" });
          return;
        }
        if (password != confirmPassword) {
          Toast.show({ type: "error", text1: "As senhas não coincidem!" });
          return;
        }
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUserUID(user.user.uid);
        Toast.show({ type: "success", text1: "Apenas mais um passo..." });
        setIsCreated(true);
      } catch (error) {
        if (error.code == "auth/weak-password") {
          Toast.show({
            type: "error",
            text1: "Sua senha deve ter mais de 6 caracteres!",
          });
          return;
        }
        if (error.code == "auth/email-already-in-use") {
          Toast.show({
            type: "error",
            text1: "Este e-mail já esta em uso!",
          });
          return;
        }
      }
    } else {
      if ((bornDate, sex, height, weight, goal == "")) {
        Toast.show({
          type: "error",
          text1: "Não deixe campos vazios!",
        });
        return;
      }
      try {
        if (String(getCurrentDate()) == bornDate) {
          Toast.show({
            type: "error",
            text1: "Insira uma data de nascimento válida!",
          });
          return;
        }
        if (moment(bornDate).isAfter(getCurrentDate())) {
          Toast.show({
            type: "error",
            text1: "Insira uma data de nascimento válida!",
          });
          return;
        }
        if (moment(bornDate).isAfter(getCurrentDate(12))) {
          Toast.show({
            type: "error",
            text1:
              "Apenas pessoas com mais de 12 anos podem se cadastrar no Nemesis!",
          });
          return;
        }
        if (moment(bornDate).isBefore(getCurrentDate(80))) {
          Toast.show({
            type: "error",
            text1: "A idade máxima é 80 anos!",
          });
          return;
        }
        if (weight < 40) {
          Toast.show({
            type: "error",
            text1: "O peso mínimo é de 40Kg!",
          });
          return;
        }
        if (weight > 200) {
          Toast.show({
            type: "error",
            text1: "O peso máximo é de 200Kg!",
          });
          return;
        }
        if (handleHeightNumber(height) < 145) {
          Toast.show({
            type: "error",
            text1: "A altura mínima é de 1,45M!",
          });
          return;
        }
        if (handleHeightNumber(height) > 220) {
          Toast.show({
            type: "error",
            text1: "A altura máxima é de 2,20M!",
          });
          return;
        }
        await setDoc(doc(db, "users", userUID), {
          uid: userUID,
          name: name,
          email: email,
          date: bornDate,
          Sex: sex,
          Height: handleHeightNumber(height),
          Weight: weight,
          Goal: goal,
        });
      } catch (error) {
        Toast.show({
          type: "error",
          text1: error.message,
        });
      }
    }
  }

  return (
    <>
      <Statusbar />
      <SafeAreaView style={styles.bar}>
        <ScrollView>
          <View style={styles.toast}>
            <Toast />
          </View>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={require("../../assets/NemesisV1.1.png")}
            />
            {!isCreated ? (
              <View style={styles.containerInput}>
                <TextInput
                  placeholder="Nome Completo"
                  placeholderTextColor="#b3b3b3"
                  style={styles.textInput}
                  onChangeText={(text) => setName(text)}
                />
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#b3b3b3"
                  style={styles.textInput}
                  onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                  secureTextEntry={true}
                  placeholder="Senha"
                  placeholderTextColor="#b3b3b3"
                  style={styles.textInput}
                  onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                  secureTextEntry={true}
                  placeholder="Confirme Sua Senha"
                  placeholderTextColor="#b3b3b3"
                  style={styles.textInput}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
              </View>
            ) : (
              <View style={styles.containerInput}>
                <DatePicker onConfirm={(event) => setBornDate(event)} />
                <InputSelect
                  onChange={(option) => setSex(option.label)}
                  data={sexList}
                  initValue="Sexo"
                />
                <InputSelect
                  onChange={(option) => setWeight(option.label)}
                  data={weightList}
                  initValue="Peso"
                />
                <InputSelect
                  onChange={(option) => setHeight(option.label)}
                  data={heightList}
                  initValue="Altura"
                />
                <InputSelect
                  onChange={(option) => setGoal(option.label)}
                  data={goalList}
                  initValue="Objetivo"
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.btnCadastro}
              onPress={() => registerUser()}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Cadastrar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnContaExistente}>
              <Text
                style={{
                  color: "#1F67A9",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Já tem uma conta? Faça Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Register;
