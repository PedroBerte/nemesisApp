import React from "react";
import { View, TextInput, Image, Text } from "react-native";

import Button from "../../../components/Button/Button";

import styles from "./EmailStepStyles";

export default function EmailStep() {
  return (
    <View style={styles.emailStepBody}>
      <TextInput
        placeholder="Nome Completo"
        placeholderTextColor="#b3b3b3"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Insira seu E-mail"
        placeholderTextColor="#b3b3b3"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Sua senha"
        placeholderTextColor="#b3b3b3"
        style={styles.textInput}
      />
      <TextInput
        placeholder="Confirme sua senha"
        placeholderTextColor="#b3b3b3"
        style={styles.textInput}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.googleButtonBody}>
          <Image
            style={styles.googleButtonImage}
            source={require("../../../assets/googleIcon.png")}
          />
          <Text style={styles.googleButtonText}>Login</Text>
        </View>
        <View style={styles.line}></View>
        <Button>Cadastrar</Button>
      </View>
    </View>
  );
}
