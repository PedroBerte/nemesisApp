import React, {useState} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity  } from "react-native";
import { CheckBox } from "react-native-elements";
import { Icon } from "react-native-vector-icons/EvilIcons";

// import { Container } from './styles';

const TaskBox = (props) => {

  const [isSelected, setSelected] = useState(false)

  return (
    <View style={styles.tasks}>
      <Text style={styles.taskText}>{props.children}</Text>
      <Text>{props.hour}</Text>


     

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