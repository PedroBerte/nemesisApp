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
import { auth } from "./../../services/firebase-config";

import styles from "./RegisterStyles";

import Statusbar from "../../components/StatusBar/StatusBar";
import InputSelect from "../../components/InputSelect/InputSelect";
import DatePicker from "../../components/DatePicker/DatePicker";

import Toast from "react-native-toast-message";

import { heightList, sexList, weightList, goalList } from "./Wordlists";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  const [isCreated, setIsCreated] = useState(true);

  function stringContainsNumber(_string) {
    return /\d/.test(_string);
  }

  async function RegisterUser() {
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
      const user = await createUserWithEmailAndPassword(auth, email, password);
      Toast.show({ type: "success", text1: "Apenas mais um passo..." });
      setIsCreated(true);
    } catch (error) {
      Toast.show({ type: "error", text1: error });
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
                <DatePicker />
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
              onPress={() => RegisterUser()}
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
