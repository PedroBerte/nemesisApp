import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import Modal from "react-native-modal";
import WorkoutDay from "./WorkoutDay";

export default function WorkoutDaysModal({ gymDays, userWorkouts, get, set }) {
  const [dayInfos, setDayInfos] = useState({});
  return (
    <Modal
      isVisible={get}
      onBackdropPress={() => set(false)}
      onBackButtonPress={() => set(false)}
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
            list={userWorkouts}
            index={0}
            workoutList={userWorkouts}
            activeDay={
              userWorkouts.find((e) => e.day == "Segunda-Feira") ? true : false
            }
          >
            Segunda-Feira
          </WorkoutDay>
          <WorkoutDay
            list={userWorkouts}
            index={1}
            workoutList={userWorkouts}
            activeDay={
              userWorkouts.find((e) => e.day == "Terça-Feira") ? true : false
            }
          >
            Terça-Feira
          </WorkoutDay>
          <WorkoutDay
            list={userWorkouts}
            index={2}
            workoutList={userWorkouts}
            activeDay={
              userWorkouts.find((e) => e.day == "Quarta-Feira") ? true : false
            }
          >
            Quarta-Feira
          </WorkoutDay>
          <WorkoutDay
            list={userWorkouts}
            index={3}
            workoutList={userWorkouts}
            activeDay={
              userWorkouts.find((e) => e.day == "Quinta-Feira") ? true : false
            }
          >
            Quinta-Feira
          </WorkoutDay>
          <WorkoutDay
            list={userWorkouts}
            index={4}
            workoutList={userWorkouts}
            activeDay={
              userWorkouts.find((e) => e.day == "Sexta-Feira") ? true : false
            }
          >
            Sexta-Feira
          </WorkoutDay>
          <WorkoutDay
            list={userWorkouts}
            index={5}
            workoutList={userWorkouts}
            activeDay={
              userWorkouts.find((e) => e.day == "Sábado") ? true : false
            }
          >
            Sábado
          </WorkoutDay>
          <WorkoutDay
            list={userWorkouts}
            index={6}
            workoutList={userWorkouts}
            activeDay={
              userWorkouts.find((e) => e.day == "Domingo") ? true : false
            }
          >
            Domingo
          </WorkoutDay>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity>
            <Text style={{ color: "#1E88E5", marginRight: 16, fontSize: 18 }}>
              Alterar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: "#45C4B0", fontSize: 18 }}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = {
  modalBody: {
    backgroundColor: "white",
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
    marginBottom: 10,
  },
  modalCloseIcon: {
    marginRight: 24,
    marginTop: 18,
  },
  modalDays: {
    display: "flex",
    alignItems: "center",
    marginTop: 18,
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "80%",
    alignSelf: "center",
    marginTop: 18,
    marginBottom: 28,
  },
};
