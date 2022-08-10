import React, { useState } from "react";
import { View, Image, SafeAreaView, Text } from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../../services/firebase-config";
import { setDoc, doc } from "firebase/firestore";

import styles from "./RegisterStyles";

import Toast from "react-native-toast-message";
import moment from "moment";
import EmailStep from "./EmailStep/EmailStep";
import UserStep from "./UserStep/UserStep";

import { AuthContext } from "./../../context/AuthContext";
import { useSignUp } from "./../../context/SignUpContext";
import { useAuthContext } from "./../../context/AuthContext";
import StatusBarComponent from "../../components/StatusBarComponent/StatusBarComponent";
import { useNavigation } from "@react-navigation/native";

import createWorkout from "./CreateWorkout";
import createDiet from "./CreateDiet";

const Register = () => {
  moment().format();
  const navigation = useNavigation();

  const { user, setUser } = useAuthContext();

  const {
    registerName,
    setRegisterName,
    registerEmail,
    setRegisterEmail,
    registerConfirmEmail,
    setRegisterConfirmEmail,
    registerPassword,
    setRegisterPassword,
    registerConfirmPassword,
    setRegisterConfirmPassword,
    registerBornDate,
    setRegisterBornDate,
    registerSex,
    setRegisterSex,
    registerHeight,
    setRegisterHeight,
    registerWeight,
    setRegisterWeight,
    registerGoal,
    setRegisterGoal,
    gymAvailability,
    setGymAvailability,
    gymFreq,
    gymDays,
    setGymDays,
    userRes,
    setUserRes,
    step,
    setStep,
    isLoggedWithGoogle,
    setIsLoggedWithGoogle,
    setGymFreq,
  } = useSignUp();

  function stringContainsNumber(_string) {
    return /\d/.test(_string);
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
    if (step == 0) {
      if (
        (registerName,
        registerEmail,
        registerPassword,
        registerConfirmPassword == "")
      ) {
        Toast.show({ type: "error", text1: "Não deixe campos vazios!" });
        return;
      }
      if (stringContainsNumber(registerName)) {
        Toast.show({ type: "error", text1: "Insira um nome valido!" });
        return;
      }
      if (registerPassword != registerConfirmPassword) {
        Toast.show({ type: "error", text1: "As senhas não coincidem!" });
        return;
      }
      Toast.show({ type: "success", text1: "Apenas mais um passo..." });
      setStep(1);
    } else {
      if (
        (registerBornDate,
        registerSex,
        registerHeight,
        registerWeight,
        registerGoal == "")
      ) {
        Toast.show({
          type: "error",
          text1: "Não deixe campos vazios!",
        });
        return;
      }
      if (String(getCurrentDate()) == registerBornDate) {
        Toast.show({
          type: "error",
          text1: "Insira uma data de nascimento válida!",
        });
        return;
      }
      if (moment(registerBornDate).isAfter(getCurrentDate())) {
        Toast.show({
          type: "error",
          text1: "Insira uma data de nascimento válida!",
        });
        return;
      }
      if (moment(registerBornDate).isAfter(getCurrentDate(12))) {
        Toast.show({
          type: "error",
          text1:
            "Apenas pessoas com mais de 12 anos podem se cadastrar no Nemesis!",
        });
        return;
      }
      if (moment(registerBornDate).isBefore(getCurrentDate(80))) {
        Toast.show({
          type: "error",
          text1: "A idade máxima é 80 anos!",
        });
        return;
      }
      if (registerWeight < 40) {
        Toast.show({
          type: "error",
          text1: "O peso mínimo é de 40Kg!",
        });
        return;
      }
      if (registerHeight < 145) {
        Toast.show({
          type: "error",
          text1: "A altura mínima é de 1,45M!",
        });
        return;
      }
      if (registerHeight > 220) {
        Toast.show({
          type: "error",
          text1: "A altura máxima é de 2,20M!",
        });
        return;
      }
      try {
        const userTemp = await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword
        );
        const uid = userTemp.user.uid;
        await setDoc(doc(db, "users", uid), {
          uid: uid,
          name: registerName,
          email: registerEmail,
          date: moment(registerBornDate).format("YYYY-MM-DD"),
          sex: registerSex,
          height: registerHeight,
          weight: registerWeight,
          goal: registerGoal,
          gymAvail: gymAvailability,
          gymFreq: gymFreq,
          gymDays: gymDays,
          userRes: userRes,
        });
        createWorkout(gymAvailability, gymDays, uid);
        createDiet(
          moment(registerBornDate).format("YYYY-MM-DD"),
          registerWeight,
          registerHeight,
          registerSex,
          registerGoal,
          userRes,
          uid
        );
        setStep(0);
        Toast.show({
          type: "success",
          text1: "Conta criada com sucesso! Aproveite!",
        });
      } catch (error) {
        if (error.code == "auth/email-already-in-use") {
          setStep(0);
          Toast.show({
            type: "error",
            text1: "Este email já está sendo usado!",
          });
        }
        if (error.code == "auth/weak-password") {
          setStep(0);
          Toast.show({
            type: "error",
            text1: "Sua senha deve ter mais de 6 caracteres!",
          });
        }
        if (error.code == "auth/invalid-email") {
          setStep(0);
          Toast.show({
            type: "error",
            text1: "Insira um email válido!",
          });
        }
        Toast.show({
          type: "error",
          text1: error.message,
        });
        throw error;
      }
    }
  }

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <Toast />
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../../assets/NemesisV1.1.png")}
              style={styles.logo}
            />
          </View>
          {step == 0 ? (
            <EmailStep registerUser={registerUser} />
          ) : (
            <UserStep registerUser={registerUser} />
          )}
          <Text
            onPress={() => navigation.navigate("Login")}
            style={styles.textAlreadyHaveAnAccount}
          >
            Já tem uma conta? Faça Login
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Register;
