import React from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import TopBar from "../../components/TopBar/TopBar";
import SettingsStyles from "./SettingsStyles";

export default function Settings() {
  return (
    <>
     
      <View style={SettingsStyles.container}>
        <Text style={SettingsStyles.text}>Configurações da Conta
        </Text>

        <View style={SettingsStyles.personalInformationView}>
          <Image
            source={require("../../assets/PerfilIcon.png")}
            style={SettingsStyles.userImage}
            resizeMode="contain"
          />

          <Text style={SettingsStyles.userName}>
            Leonardo Luccarelli
          </Text>

          <Text style={SettingsStyles.userEmail}>
            leoluccarelli7@gmail.com
          </Text>

          <Text style={SettingsStyles.userBornDate}>
            Nascido em: 08/06/2005
          </Text>

          <TouchableOpacity>
            <Text style={SettingsStyles.modalButton}>
              Ler mais...
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={SettingsStyles.changePasswordView}>
            <Text style={SettingsStyles.tittleText}>
              Alterar senha: 
            </Text>

            <TouchableOpacity style={SettingsStyles.changeDeleteButton}>
              <Text style={SettingsStyles.buttonText}>
                Alterar Senha
              </Text>
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
              <Text style={SettingsStyles.tittleText}>
                Excluir conta:
              </Text>

              <TouchableOpacity style={SettingsStyles.changeDeleteButton}>
                <Text style={SettingsStyles.buttonText}>
                  Excluir conta
                </Text>
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
    </>
  );
}

