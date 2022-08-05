import React, { useState } from "react";
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
  yesAndNo,
  userRes,
} from "./Wordlists";

export default function UserStep() {
  const [gymDays, setGymDays] = useState(3);

  return (
    <View style={styles.userStepBody}>
      <DatePicker />
      <View style={styles.registerSelectsBody}>
        <ModalSelector
          initValue="Sexo"
          selectStyle={styles.modalSelectStyle}
          style={styles.selectModal}
          animationType="fade"
          data={sexList}
        />
        <ModalSelector
          initValue="Altura"
          style={styles.selectModal}
          selectStyle={styles.modalSelectStyle}
          animationType="fade"
          data={heightList}
        />
        <ModalSelector
          initValue="Peso"
          style={styles.selectModal}
          selectStyle={styles.modalSelectStyle}
          animationType="fade"
          data={weightList}
        />
      </View>
      <ModalSelector
        initValue="Objetivo"
        style={styles.bigSelectModal}
        selectStyle={styles.modalSelectStyle}
        animationType="fade"
        data={goalList}
      />
      <ModalSelector
        initValue="Alguma academia disponível?"
        style={styles.bigSelectModal}
        selectStyle={styles.modalSelectStyle}
        animationType="fade"
        data={yesAndNo}
      />
      <ModalSelector
        initValue="Já praticou musculação / calistenia"
        style={styles.bigSelectModal}
        selectStyle={styles.modalSelectStyle}
        animationType="fade"
        data={yesAndNo}
      />
      <ModalSelector
        initValue="Alguma restrição alimentar?"
        style={styles.bigSelectModal}
        selectStyle={styles.modalSelectStyle}
        animationType="fade"
        data={userRes}
      />
      <View style={styles.gymDaysTextBody}>
        <Text style={styles.gymDaysText}>Dias disponíveis para treino: </Text>
        <Text style={styles.gymDaysText}>{gymDays + " dias"}</Text>
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
          onValueChange={(value) => setGymDays(value)}
        />
      </LinearGradient>
      <Button>Cadastrar</Button>
    </View>
  );
}
