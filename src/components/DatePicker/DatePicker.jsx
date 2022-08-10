import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from "./DatePickerStyles";

import { useSignUp } from "../../context/SignUpContext";

import moment from "moment";

const DatePicker = (props) => {
  moment().format();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const { registerBornDate, setRegisterBornDate } = useSignUp();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (userDate) => {
    setRegisterBornDate(userDate.toLocaleDateString("en-GB"));
    setDatePickerVisibility(false);
  };

  function showDefaultText() {
    if (registerBornDate == "") {
      return "Data de Nascimento";
    } else {
      return moment(registerBornDate).format("DD/MM/YYYY");
    }
  }

  return (
    <View style={styles.dataPickerBody}>
      <TouchableOpacity style={styles.btnData} onPress={() => showDatePicker()}>
        <Text style={{ color: "#b3b3b3", paddingLeft: 10 }}>
          {showDefaultText()}
        </Text>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          locale="pt-BR"
          buttonTextColorIOS="#45C4B0"
          cancelTextIOS="Sair"
          confirmTextIOS="Confirmar"
        />
      </TouchableOpacity>
    </View>
  );
};

export default DatePicker;
