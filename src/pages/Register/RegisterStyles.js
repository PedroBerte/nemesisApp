import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    toast: {
      marginTop: "-5%",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "25%",
      backgroundColor: "#EBEBEB",

    },

    container: {
      width: "100%",
      // marginTop: "-15%",
      alignItems: "center",
      justifyContent: "center",
      // paddingTop: "5%",
      backgroundColor: "#EBEBEB",
    },

    containerInput: {
      width: "100%",
      marginTop: "-15%",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "15%",
      backgroundColor: "#EBEBEB",

    },
  
    image: {
      width: 200,
      height: 100,
      resizeMode: "contain",
      marginBottom: 50,
      marginTop: "10%"
    },
  
    textInput: {
      width: "80%",
      height: 50,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      marginBottom: 20,
      paddingLeft: 10,
      shadowColor: "#000000",
      shadowOffset: {
        width: 6,
        height: 6,
      },
      shadowOpacity: 0.2,
      borderColor: "#C6C6C6",
      borderWidth: 1,
    },
    btnCadastro: {
      width: "40%",
      height: 50,
      backgroundColor: "#45c4b0",
      borderRadius: 10,
      justifyContent: "center",
      marginTop: 20,
    },
    btnContaExistente: {
      width: "50%",
      height: 40,
      borderRadius: 10,
      marginTop: 20,
    },
    bar: {
      flex: 1,
      backgroundColor: "#EBEBEB",
      color: "#EBEBEB",
      
    },
  });

  export default styles;