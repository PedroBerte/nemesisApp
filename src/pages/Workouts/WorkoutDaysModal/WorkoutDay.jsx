import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";

import ModalSelector from "react-native-modal-selector";

export default function WorkoutDay(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [activeDay, setActiveDay] = useState(props.activeDay);
  const [isDisabled, setIsDisabled] = useState(!props.activeDay);

  let index = 0;

  const typeList = [
    { key: index++, section: true, label: "Selecione o treino" },
    { key: index++, label: "Treino A" },
    { key: index++, label: "Treino B" },
    { key: index++, label: "Treino C" },
    { key: index++, label: "Treino D" },
    { key: index++, label: "Treino E" },
  ];

  function returnTypeList() {
    const days = 5 - props.gymDays.replace("GYM-DAYS-", "");
    for (let i = 0; i < days; i++) {
      typeList.pop();
    }
  }

  function handleClick() {
    setActiveDay(!activeDay);
    setIsDisabled(!isDisabled);
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
                {props.list[props.index]?.workoutInfos.name == undefined
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
          data={typeList}
          onChange={(v) => setRegisterSex(v.value)}
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
