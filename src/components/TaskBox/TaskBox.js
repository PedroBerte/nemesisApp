import React, {useState} from "react";
import { View, StyleSheet, Text } from "react-native";
import { CheckBox } from "react-native-elements";
import { Icon } from "react-native-vector-icons/FontAwesome";

// import { Container } from './styles';

const TaskBox = (props) => {

  const [isSelected, setSelected] = useState(false)

  return (
    <View style={styles.tasks}>
      <Text style={styles.taskText}>{props.children}</Text>
      <Text>{props.hour}</Text>
      <CheckBox
      checkedIcon="check"
      uncheckedIcon="square-o"
      checkedColor="green"
      uncheckedColor="red"
      checked={isSelected}
      onPress={() => setSelected(!isSelected)}

      />

    </View>
  );
};

const styles = StyleSheet.create({
  tasks: {
    backgroundColor: "rgba(29, 29, 29, 0.08)",
    height: 45,
    width: "100%",
    marginTop: 15,
    borderRadius: 10,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(29, 29, 29, 0.20)',
    borderWidth: 1
  },
  taskText: {
    fontSize: 15,
  },
});

export default TaskBox;
