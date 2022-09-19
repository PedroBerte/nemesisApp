import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import ModalSelector from "react-native-modal-selector";

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

export default function WorkoutDay(props) {
  const [activeDay, setActiveDay] = useState(props.activeDay);
  const [isDisabled, setIsDisabled] = useState(!props.activeDay);

  useEffect(() => {
    if (!activeDay) {
      handleDisableWorkout();
    }
  }, [activeDay]);

  function getDayToWorkout(workoutLetter) {
    if (props.gymAvail == "GYM-S") {
      if (props.gymDays == "GYM-DAYS-3") {
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

  let index = 0;

  const typeList = [
    { key: index++, section: true, label: "Selecione o treino" },
    { key: index++, label: "Treino A", value: getDayToWorkout("A") },
    { key: index++, label: "Treino B", value: getDayToWorkout("B") },
    { key: index++, label: "Treino C", value: getDayToWorkout("C") },
    { key: index++, label: "Treino D", value: getDayToWorkout("D") },
    { key: index++, label: "Treino E", value: getDayToWorkout("E") },
  ];

  function returnTypeList() {
    const days = props.gymDays.replace("GYM-DAYS-", "");
    for (let i = 0; i < days; i++) {
      typeList.pop();
      return typeList;
    }
  }

  function handleClick() {
    setActiveDay(!activeDay);
    setIsDisabled(!isDisabled);
  }

  function handleChangeWorkout(v) {
    props.setNewList([
      ...props.list,
      (props.list[props.index].workoutInfos = v.value),
    ]);
  }

  function handleDisableWorkout() {
    props.setNewList([
      ...props.list,
      (props.list[props.index].workoutInfos = {}),
    ]);
  }

  return (
    <View style={styles.daySelectorBody}>
      <TouchableOpacity style={styles.dayBody} onPress={() => handleClick()}>
        <Image
          source={
            activeDay
              ? require("../../../assets/check.png")
              : require("../../../assets/grayCircle.png")
          }
          style={styles.dayCheckIcon}
        />
        <Text style={styles.weekDay}>{props.children}</Text>
      </TouchableOpacity>
      <View style={styles.typeSelectorBody}>
        <Text style={styles.dayCheck}>Tipo: </Text>
        <ModalSelector
          initValue={
            activeDay ? (
              <>
                {props.list[props.index].workoutInfos.name == undefined
                  ? "Treino A"
                  : props.list[props.index].workoutInfos.name}
              </>
            ) : (
              "Descanso"
            )
          }
          selectStyle={styles.modalSelectStyle}
          style={styles.selectModal}
          animationType="fade"
          data={returnTypeList()}
          onChange={(v) => handleChangeWorkout(v)}
          disabled={isDisabled}
        />
      </View>
    </View>
  );
}

const styles = {
  daySelectorBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    height: 45,
    backgroundColor: "#F5F5F5",
    borderColor: "#D7D7D7",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  dayBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  typeSelectorBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectModal: {
    borderWidth: 0,
  },
  modalSelectStyle: {
    borderWidth: 0,
  },
  dayCheckIcon: {
    marginLeft: 8,
    marginRight: 8,
    width: 17,
    height: 17,
  },
  weekDay: {
    fontSize: 13,
  },
  dayCheck: {
    fontSize: 13,
  },
};
