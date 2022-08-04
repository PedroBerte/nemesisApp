import React, { useState, useContext } from "react";
import { View, Image, SafeAreaView } from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./../../services/firebase-config";
import { setDoc, doc } from "firebase/firestore";

import styles from "./RegisterStyles";

import Toast from "react-native-toast-message";
import moment from "moment";
import EmailStep from "./EmailStep/EmailStep";
import UserStep from "./UserStep/UserStep";

import { AuthContext } from "./../../context/AuthContext";
import StatusBarComponent from "../../components/StatusBarComponent/StatusBarComponent";

const Register = () => {
  moment().format();

  const { step } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [bornDate, setBornDate] = useState("");
  const [sex, setSex] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

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
    if (step == 0) {
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
      Toast.show({ type: "success", text1: "Apenas mais um passo..." });
      setStep(1);
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
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          date: bornDate,
          sex: sex,
          height: handleHeightNumber(height),
          weight: weight,
          goal: goal,
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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../../assets/NemesisV1.1.png")}
              style={styles.logo}
            />
          </View>
          {step == 0 ? <EmailStep /> : <UserStep />}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Register;
