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
          {userWorkouts.map((workoutDay, i) => {
            return (
              <WorkoutDay
                list={userWorkouts}
                index={i}
                workoutList={userWorkouts}
                gymDays={gymDays}
                activeDay={
                  workoutDay.workoutInfos.name != undefined ? true : false
                }
              >
                {workoutDay.day}
              </WorkoutDay>
            );
          })}
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
