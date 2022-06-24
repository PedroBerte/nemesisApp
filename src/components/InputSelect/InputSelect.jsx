import React from "react";

import styles from "./InputSelectStyles";

import ModalSelector from "react-native-modal-selector";

const InputSelect = (props) => {
  return (
    <ModalSelector
      {...props}
      data={props.data}
      initValue={props.initValue}
      style={styles.modalSelector}
      selectStyle={styles.modalSelectStyle}
      animationType="fade"
      overlayStyle={{
        flex: 1,
        padding: "5%",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
      sectionTextStyle={{
        color: "#3AAE9C",
        fontSize: 25,
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
      selectedItemTextStyle={{ color: "#5faac7" }}
      cancelText="Sair"
      cancelTextStyle={{
        color: "red",
        fontSize: 20,
        alignSelf: "center",
        paddingTop: 3,
      }}
      cancelStyle={{ borderRadius: 10, height: 45, alignItems: "center" }}
      optionContainerStyle={{
        borderRadius: 10,
        marginBottom: 15,
        maxHeight: 650,
      }}
      optionStyle={{ height: 50, alignContent: "center", alignItems: "center" }}
      optionTextStyle={{ color: "#525252", fontSize: 20, paddingTop: 5 }}
      backdropPressToClose={true}
    />
  );
};

export default InputSelect;
