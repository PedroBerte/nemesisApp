import React, { useEffect } from "react";
import { View, TextInput, Image, Text, TouchableOpacity } from "react-native";

import Button from "../../../components/Button/Button";

import styles from "./EmailStepStyles";

import { useSignUp } from "../../../context/SignUpContext";

export default function EmailStep({ registerUser }) {
  const {
    setRegisterName,
    setRegisterEmail,
    setRegisterPassword,
    setRegisterConfirmPassword,
    isLoggedWithGoogle,
    setIsLoggedWithGoogle,
  } = useSignUp();

  return (
    <View style={styles.emailStepBody}>
      <TextInput
        placeholder="Nome Completo"
        placeholderTextColor="#b3b3b3"
        style={styles.textInput}
        onChangeText={(text) => setRegisterName(text)}
      />
      <TextInput
        placeholder="Insira seu E-mail"
        placeholderTextColor="#b3b3b3"
        style={styles.textInput}
        onChangeText={(text) => setRegisterEmail(text)}
      />
      <TextInput
        placeholder="Sua senha"
        placeholderTextColor="#b3b3b3"
        style={styles.textInput}
        onChangeText={(text) => setRegisterPassword(text)}
      />
      <TextInput
        placeholder="Confirme sua senha"
        placeholderTextColor="#b3b3b3"
        style={styles.textInput}
        onChangeText={(text) => setRegisterConfirmPassword(text)}
      />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.googleButtonBody}>
          <Image
            style={styles.googleButtonImage}
            source={require("../../../assets/googleIcon.png")}
          />
          <Text style={styles.googleButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.line}></View>
        <Button onPress={() => registerUser()}>Cadastrar</Button>
      </View>
    </View>
  );
}
