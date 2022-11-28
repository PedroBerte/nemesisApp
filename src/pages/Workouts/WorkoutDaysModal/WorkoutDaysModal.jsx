import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import Modal from "react-native-modal";
import WorkoutDay from "./WorkoutDay";

import { auth, db } from "../../../services/firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

import {
  workA_day3,
  workB_day3,
  workC_day3,
  workA_day4,
  workB_day4,
  workC_day4,
  workD_day4,
  workA_day5,
  workB_day5,
  workC_day5,
  workD_day5,
  workE_day5,
  workA_noGym,
  workB_noGym,
  workC_noGym,
} from "../../Register/utils/workouts";

export default function WorkoutDaysModal({
  gymDays,
  userWorkouts,
  get,
  set,
  gymAvail,
  uid,
}) {
  const [dayInfos, setDayInfos] = useState(userWorkouts);
  const [newDayInfos, setNewDayInfos] = useState();
  const [showedWorkoutDays, setShowedWorkoutDays] = useState([]);

  useEffect(() => {
    setDayInfos(userWorkouts);

    const days = gymDays.replace("GYM-DAYS-", "");
    switch (days) {
      case "3":
        setShowedWorkoutDays([
          { key: 0, label: "Treino A", value: getDayToWorkout("A") },
          { key: 1, label: "Treino B", value: getDayToWorkout("B") },
          { key: 2, label: "Treino C", value: getDayToWorkout("C") },
        ]);
        break;
      case "4":
        setShowedWorkoutDays([
          { key: 0, label: "Treino A", value: getDayToWorkout("A") },
          { key: 1, label: "Treino B", value: getDayToWorkout("B") },
          { key: 2, label: "Treino C", value: getDayToWorkout("C") },
          { key: 3, label: "Treino D", value: getDayToWorkout("D") },
        ]);
        break;
      case "5":
        setShowedWorkoutDays([
          { key: 0, label: "Treino A", value: getDayToWorkout("A") },
          { key: 1, label: "Treino B", value: getDayToWorkout("B") },
          { key: 2, label: "Treino C", value: getDayToWorkout("C") },
          { key: 3, label: "Treino D", value: getDayToWorkout("D") },
          { key: 4, label: "Treino E", value: getDayToWorkout("E") },
        ]);
        break;
      default:
        setShowedWorkoutDays([]);
        break;
    }
  }, [userWorkouts]);

  function getDayToWorkout(workoutLetter) {
    if (gymAvail == "GYM-S") {
      if (gymDays == "GYM-DAYS-3") {
        if (workoutLetter == "A") {
          return workA_day3;
        } else if (workoutLetter == "B") {
          return workB_day3;
        } else if (workoutLetter == "C") {
          return workC_day3;
        }
      } else if (props.gymDays == "GYM-DAYS-4") {
        if (workoutLetter == "A") {
          return workA_day4;
        } else if (workoutLetter == "B") {
          return workB_day4;
        } else if (workoutLetter == "C") {
          return workC_day4;
        } else if (workoutLetter == "D") {
          return workD_day4;
        }
      } else if (props.gymDays == "GYM-DAYS-5") {
        if (workoutLetter == "A") {
          return workA_day5;
        } else if (workoutLetter == "B") {
          return workB_day5;
        } else if (workoutLetter == "C") {
          return workC_day5;
        } else if (workoutLetter == "D") {
          return workD_day5;
        } else if (workoutLetter == "E") {
          return workE_day5;
        }
      }
    } else {
      if (workoutLetter == "A") {
        return workA_noGym;
      } else if (workoutLetter == "B") {
        return workB_noGym;
      } else if (workoutLetter == "C") {
        return workC_noGym;
      }
    }
  }

  async function handleChangeWorkout() {
    await updateDoc(doc(db, "workouts", uid), {
      workouts: newDayInfos.filter((element) => element.day != undefined),
    });
    console.log(newDayInfos);
    set(false);
  }

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
          <TouchableOpacity onPress={() => set(false)}>
            <Image
              style={styles.modalCloseIcon}
              source={require("../../../assets/closeIcon.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modalDays}>
          {userWorkouts.map((workoutDay, i) => {
            return (
              <WorkoutDay
                typeList={showedWorkoutDays}
                list={dayInfos}
                setNewList={setNewDayInfos}
                index={i}
                gymDays={gymDays}
                gymAvail={gymAvail}
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
          <TouchableOpacity onPress={() => handleChangeWorkout()}>
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
