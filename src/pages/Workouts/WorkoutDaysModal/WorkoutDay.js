import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import ModalSelector from "react-native-modal-selector";

export default function WorkoutDay(props) {
  const [isSelected, setIsSelected] = useState(false);
  const [activeDay, setActiveDay] = useState(props.activeDay);

  let index = 0;
  const typeList = [
    { key: index++, section: true, label: "Selecione o treino" },
    { key: index++, label: "Treino A" },
    { key: index++, label: "Treino B" },
    { key: index++, label: "Treino C" },
    { key: index++, label: "Treino D" },
    { key: index++, label: "Treino E" },
  ];

  return (
    <View style={styles.daySelectorBody}>
      <TouchableOpacity
        style={styles.dayBody}
        onPress={() => setActiveDay(!activeDay)}
      >
        <Image
          source={
            activeDay
              ? require("../../../assets/check.png")
              : require("../../../assets/grayCircle.png")
          }
          style={styles.dayCheckIcon}
        />
        <Text>{props.children}</Text>
      </TouchableOpacity>
      <View style={styles.typeSelectorBody}>
        <Text>Tipo: </Text>
        <ModalSelector
          initValue="texc"
          selectStyle={styles.modalSelectStyle}
          style={styles.selectModal}
          animationType="fade"
          data={typeList}
          onChange={(v) => setRegisterSex(v.value)}
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
    height: 40,
    backgroundColor: "#F5F5F5",
    borderColor: "#D7D7D7",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  dayBody: {
    display: "flex",
    flexDirection: "row",
  },
  typeSelectorBody: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  selectModal: {
    color: "transparent",
  },
  modalSelectStyle: {
    display: "flex",
    justifyContent: "center",
  },
  dayCheckIcon: {
    marginLeft: 8,
    marginRight: 8,
  },
};
