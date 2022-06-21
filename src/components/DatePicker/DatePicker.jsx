import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from "./DatePickerStyles";

const DatePicker = (props) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (userDate) => {
    setDate(userDate.toLocaleDateString());
    hideDatePicker();
    console.warn(userDate.toLocaleDateString());
  };

  const [date, setDate] = useState("");

  function showDefaultText() {
    if (date == "") {
      return "Data de Nascimento";
    } else {
      return date;
    }
  }

  return (
    <View style={styles.dataPickerBody}>
      <TouchableOpacity style={styles.btnData} onPress={showDatePicker}>
        <Text style={{ color: "#b3b3b3", paddingLeft: 10 }}>
          {showDefaultText()}
        </Text>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          display="default"
          locale="pt-BR"
          buttonTextColorIOS="#45C4B0"
          cancelTextIOS="Sair"
          confirmTextIOS="Confirmar"
          isDarkModeEnabled="false"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DatePicker;
