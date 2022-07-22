import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";

import { collection, getDocs } from "firebase/firestore";

import styles from "./LoginStyles.js";

import { AuthContext } from "../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(AuthContext);

  async function trySignIn() {
    await signIn(email, password);
  }
  return (
    <>
      <View style={styles.body}>
        <View style={styles.toast}>
          <Toast />
        </View>
        <View style={styles.container}>
          <Image
            source={require("../../assets/NemesisV1.1.png")}
            style={{ width: 250 }}
            resizeMode="contain"
          />
          <TextInput
            placeholder="Seu E-mail"
            placeholderTextColor="#b3b3b3"
            style={styles.textInput}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Sua Senha"
            placeholderTextColor="#b3b3b3"
            style={styles.textInput}
            onChangeText={(text) => setPassword(text)}
          />
          <View style={styles.rightDiv}>
            <Text
              style={{
                color: "#1F67A9",
                textAlign: "right",
                fontStyle: "italic",
              }}
            >
              Esqueceu sua senha?
            </Text>
          </View>

          <TouchableOpacity
            style={styles.btnRegister}
            onPress={() => trySignIn(email, password)}
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
        </View>
      </View>
    </>
  );
}
