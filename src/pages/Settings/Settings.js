import React, { useState } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";

import SettingsStyles from "./SettingsStyles";

import Modal from "react-native-modal";
import TopBar from "../../components/TopBar/TopBar";
import TabBar from "../../components/TabBar/TabBar";

export default function Settings() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <TopBar />
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        onBackButtonPress={() => setVisible(false)}
        hideModalContentWhileAnimating={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={500}
        animationOutTiming={500}
      >
        <View style={SettingsStyles.modal}>
          <View style={SettingsStyles.modalTop}>
            <Text style={SettingsStyles.headerText}>Informações da conta:</Text>
            <Image
              source={require("../../assets/logo.png")}
              style={SettingsStyles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={SettingsStyles.modalImage}>
            <Image
              source={require("../../assets/PerfilIcon.png")}
              style={{ width: 105, height: 105, marginBottom: 5 }}
              resizeMode="contain"
            />
            <Text style={{ marginBottom: 30 }}>Leonardo Enrico Luccarelli</Text>
          </View>
          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Email: </Text>
            <Text>leoluccarelli7@gmail.com</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Data de nascimento: </Text>
            <Text>08/06/2005</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Sexo: </Text>
            <Text>Masculino</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Peso: </Text>
            <Text>83Kg</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Objetivo: </Text>
            <Text>Perda de Peso</Text>
          </View>

          <View style={SettingsStyles.modalData}>
            <Text style={{ fontWeight: "bold" }}>Altura: </Text>
            <Text>183cm</Text>
          </View>
        </View>
      </Modal>

      <View style={SettingsStyles.container}>
        <Text style={SettingsStyles.text}>Configurações da Conta</Text>

        <View style={SettingsStyles.personalInformationView}>
          <Image
            source={require("../../assets/PerfilIcon.png")}
            style={SettingsStyles.userImage}
            resizeMode="contain"
          />

          <Text style={SettingsStyles.userName}>Leonardo Luccarelli</Text>

          <Text style={SettingsStyles.userEmail}>leoluccarelli7@gmail.com</Text>

          <Text style={SettingsStyles.userBornDate}>
            Nascido em: 08/06/2005
          </Text>

          <TouchableOpacity
            onPress={() => {
              setVisible(true);
            }}
          >
            <Text style={SettingsStyles.modalButton}>Ler mais...</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={SettingsStyles.changePasswordView}>
            <Text style={SettingsStyles.tittleText}>Alterar senha:</Text>

            <TouchableOpacity style={SettingsStyles.changeDeleteButton}>
              <Text style={SettingsStyles.buttonText}>Alterar Senha</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 25 }}>
            <Text style={SettingsStyles.detailsText}>
              Enviaremos um e-mail para você alterar a sua senha.
            </Text>
          </View>

          <View style={SettingsStyles.spacer} />

          <View>
            <View style={SettingsStyles.deleteAccountView}>
              <Text style={SettingsStyles.tittleText}>Excluir conta:</Text>

              <TouchableOpacity style={SettingsStyles.changeDeleteButton}>
                <Text style={SettingsStyles.buttonText}>Excluir conta</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginLeft: 25, width: "62%" }}>
              <Text style={SettingsStyles.detailsText}>
                Exclua todos os seus dados, preferências e acesso a conta.
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TabBar />
    </>
  );
}
