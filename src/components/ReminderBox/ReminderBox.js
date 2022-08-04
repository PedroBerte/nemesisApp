import React, {useState} from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity  } from "react-native";
import { CheckBox } from "react-native-elements";
import { Icon } from "react-native-vector-icons/EvilIcons";

const ReminderBox = (props) => {

  const [isSelected, setSelected] = useState(false)

  return (
    <TouchableOpacity onPress={() => {
        setSelected(!isSelected);
      }}>
    <View style={styles.tasks}>
      <Text style={styles.taskText}>{props.children}</Text>


    {isSelected == false ?(
      <Image source={require("../../assets/grayCircle.png")}
              resizeMode="contain"  
              />
      ):( 
      <Image source={require("../../assets/check.png")}
              resizeMode="contain"  
              />
)}
     

    </View>
    </TouchableOpacity>
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

export default ReminderBox;