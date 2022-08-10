import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import DatePicker from "./../../../components/DatePicker/DatePicker";

import Button from "./../../../components/Button/Button";

import styles from "./UserStepStyles";

import ModalSelector from "react-native-modal-selector";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import {
  sexList,
  heightList,
  weightList,
  goalList,
  gymFreq,
  gymAvail,
  userRes,
} from "./Wordlists";

import { useSignUp } from "./../../../context/SignUpContext";

export default function UserStep({ registerUser }) {
  const {
    setRegisterBornDate,
    setRegisterSex,
    setRegisterHeight,
    setRegisterWeight,
    setRegisterGoal,
    setGymAvailability,
    setGymFreq,
    setUserRes,
    gymDays,
    setGymDays,
  } = useSignUp();

  return (
    <View style={styles.userStepBody}>
      <DatePicker onChange={(v) => setRegisterBornDate(v)} />
      <View style={styles.registerSelectsBody}>
        <ModalSelector
          initValue="Sexo"
          selectStyle={styles.modalSelectStyle}
          style={styles.selectModal}
          animationType="fade"
          data={sexList}
          onChange={(v) => setRegisterSex(v.value)}
        />
        <ModalSelector
          initValue="Altura"
          style={styles.selectModal}
          selectStyle={styles.modalSelectStyle}
          animationType="fade"
          data={heightList}
          onChange={(v) => setRegisterHeight(v.value)}
        />
        <ModalSelector
          initValue="Peso"
          style={styles.selectModal}
          selectStyle={styles.modalSelectStyle}
          animationType="fade"
          data={weightList}
          onChange={(v) => setRegisterWeight(v.value)}
        />
      </View>
      <ModalSelector
        initValue="Objetivo"
        style={styles.bigSelectModal}
        selectStyle={styles.modalSelectStyle}
        animationType="fade"
        data={goalList}
        onChange={(v) => setRegisterGoal(v.value)}
      />
      <ModalSelector
        initValue="Alguma academia disponível?"
        style={styles.bigSelectModal}
        selectStyle={styles.modalSelectStyle}
        animationType="fade"
        data={gymAvail}
        onChange={(v) => setGymAvailability(v.value)}
      />
      <ModalSelector
        initValue="Já praticou musculação / calistenia"
        style={styles.bigSelectModal}
        selectStyle={styles.modalSelectStyle}
        animationType="fade"
        data={gymFreq}
        onChange={(v) => setGymFreq(v.value)}
      />
      <ModalSelector
        initValue="Alguma restrição alimentar?"
        style={styles.bigSelectModal}
        selectStyle={styles.modalSelectStyle}
        animationType="fade"
        data={userRes}
        onChange={(v) => setUserRes(v.value)}
      />
      <View style={styles.gymDaysTextBody}>
        <Text style={styles.gymDaysText}>Dias disponíveis para treino: </Text>
        <Text style={styles.gymDaysText}>
          {gymDays.replace("GYM-DAYS-", "") + " dias"}
        </Text>
      </View>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#4DFD7E", "#EFFD4D", "#FD4D4D"]}
        style={{
          width: "80%",
          height: 15,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <Slider
          style={styles.gymDaysSlider}
          minimumValue={3}
          maximumValue={6}
          step={1}
          minimumTrackTintColor="transparent"
          maximumTrackTintColor="transparent"
          thumbTintColor="#808080"
          thumbImage={require("./../../../assets/thumbImage.png")}
          onValueChange={(value) => setGymDays(`GYM-DAYS-${value}`)}
        />
      </LinearGradient>
      <Button onPress={() => registerUser()}>Cadastrar</Button>
    </View>
  );
}
