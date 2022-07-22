import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

export default function TopBar() {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={require("../../assets/logo.png")}
          style={{ width: 40, height: 50 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("UserAccount")}>
        <Image
          source={require("../../assets/user.png")}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    backgroundColor: "translucent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 14,
  },
});
