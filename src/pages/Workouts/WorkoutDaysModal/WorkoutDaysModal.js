import { View, Text, Image } from "react-native";
import React, { useState } from "react";

import Modal from "react-native-modal";
import WorkoutDay from "./WorkoutDay";

export default function WorkoutDaysModal({ gymDays, userWorkouts }) {
  const [workoutDaysModalIsVisible, setWorkoutDaysModalIsVisible] =
    useState(true);
  return (
    <Modal
      isVisible={workoutDaysModalIsVisible}
      onBackdropPress={() => setWorkoutDaysModalIsVisible(false)}
      onBackButtonPress={() => setWorkoutDaysModalIsVisible(false)}
      hideModalContentWhileAnimating={true}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View style={styles.modalBody}>
        <View style={styles.modalHeader}>
          <View>
            <Text style={styles.modalHeaderTitle}>Seus dias de treino:</Text>
            <Text style={styles.modalHeaderSubtitle}>
              Dias selecionados para treino: {gymDays.replace("GYM-DAYS-", "")}
            </Text>
          </View>
          <Image
            style={styles.modalCloseIcon}
            source={require("../../../assets/closeIcon.png")}
          />
        </View>
        <View style={styles.modalDays}>
          <WorkoutDay
            activeDay={
              userWorkouts.find((e) => e.day == "Segunda-Feira") ? true : false
            }
          >
            Segunda-Feira
          </WorkoutDay>
          <WorkoutDay
            activeDay={
              userWorkouts.find((e) => e.day == "Terça-Feira") ? true : false
            }
          >
            Terça-Feira
          </WorkoutDay>
          <WorkoutDay
            activeDay={
              userWorkouts.find((e) => e.day == "Quarta-Feira") ? true : false
            }
          >
            Quarta-Feira
          </WorkoutDay>
          <WorkoutDay
            activeDay={
              userWorkouts.find((e) => e.day == "Quinta-Feira") ? true : false
            }
          >
            Quinta-Feira
          </WorkoutDay>
          <WorkoutDay
            activeDay={
              userWorkouts.find((e) => e.day == "Sexta-Feira") ? true : false
            }
          >
            Sexta-Feira
          </WorkoutDay>
          <WorkoutDay
            activeDay={
              userWorkouts.find((e) => e.day == "Sábado") ? true : false
            }
          >
            Sábado
          </WorkoutDay>
          <WorkoutDay
            activeDay={
              userWorkouts.find((e) => e.day == "Domingo") ? true : false
            }
          >
            Domingo
          </WorkoutDay>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  modalBody: {
    backgroundColor: "white",
    height: "80%",
    borderRadius: 15,
    display: "flex",
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalHeaderTitle: {
    fontSize: 22,
    marginTop: 18,
    marginLeft: 18,
  },
  modalHeaderSubtitle: {
    fontSize: 15,
    marginLeft: 18,
  },
  modalCloseIcon: {
    marginRight: 24,
    marginTop: 18,
  },
  modalDays: {
    display: "flex",
    alignItems: "center",
  },
};
