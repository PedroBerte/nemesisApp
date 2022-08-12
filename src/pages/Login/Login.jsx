import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

import { collection, getDocs } from "firebase/firestore";

import styles from "./LoginStyles.js";

import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button/Button.jsx";

export default function Login() {
  const navigation = useNavigation();

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
          <Button style={styles.loginButton} onPress={() => trySignIn(email, password)}>Login</Button>
          <Text
            style={styles.textNotAccount}
            onPress={() => navigation.navigate("Register")}
          >
            Não tem uma conta? Crie aqui!
          </Text>
        </View>
      </View>
    </>
  );
}
