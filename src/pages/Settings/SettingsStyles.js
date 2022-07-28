import React from "react";
import { StyleSheet } from "react-native";

const SettingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    display: 'flex',
    justifyContent: 'flex-start'
  },
  toast: {
    backgroundColor: "#EBEBEB",
    
  },
  content: {
    marginTop: 35,
  },
  text: {
    fontSize: 23,
    fontWeight: "bold",
    color: "black",
    paddingLeft: 25,
    color: "#303030",
  },
  personalInformationView: {
    flexDirection: "row",
    display: "flex",
    alignItems: 'flex-start',
    marginTop: 30,
    justifyContent: "space-around"

  },
  userImage: {
    width: 105,
    height: 105
  },
  data: {
    alignItems: "flex-start"
  },
  userName: {
    fontSize: 20,
    marginBottom: 7,
    fontWeight: "bold",
    textAlign: "center",
    color: "#303030",
  },
  userEmail: {
    fontSize: 15,
    marginBottom: 3,
    textAlign: "center",
    color: "#303030",
  },
  userBornDate: {

    fontSize: 15,
    textAlign: "center",
    color: "#303030",
    marginBottom: 7
  },
  modalButton: {  
    fontSize: 15,
    color: "#1E90C0",
  },
  changePasswordView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 25,
    marginLeft: 25,
    marginTop: 60,
  },
  tittleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#303030",
    marginLeft: 15
  },
  changeDeleteButton: {
    backgroundColor: "#C44545",
    width: 90,
    height: 25,
    alignSelf: "flex-end",
    borderRadius: 15,
    marginTop: 20,
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 1,
      height: 5,
    },
    shadowOpacity: 0.2,
    borderColor: "#C6C6C6",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
  detailsText: {
    color: "#303030",
    fontSize: 10,
  },
  spacer: {
    width: "90%",
    backgroundColor: "#BEBEBE",
    height: 1,
    alignSelf: "center",
    marginTop: 20,
  },
  deleteAccountView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 25,
    marginLeft: 25,
    marginTop: 20,
  },

  modal: {
    backgroundColor:'#fff',
    borderRadius: 10,
    paddingBottom: 50,
    marginHorizontal: '4%'
  },

  modalTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },

  headerText: {
    fontSize: 21,
    marginLeft: 25,
    marginTop: 25,
    color: '#303030'
  },

  logo: {
    width: 22,
    height: 34,
    marginRight: 25,
    marginTop: 25
  },

  modalImage: {
    alignItems: 'center',
    marginTop: 25,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  
  modalData: {
    marginLeft: 50,
    flexDirection: 'row',
    marginBottom: 5,    
  }

});

export default SettingsStyles;
