import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { resetToRouteName } from "../bottom/BottomNavBar";

export const TopNavBarRight = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          resetToRouteName(navigation, "Home");
        }}
      >
        <View style={styles.textContainer}>
          <Text>
            <Text style={styles.greenText}>A</Text>
            <Text style={styles.blackText}>G</Text>
            <Text style={styles.redText}>H</Text>
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          resetToRouteName(navigation, "Settings");
        }}
        style={styles.settingsButton}
      >
        <View>
          <Feather name="settings" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 5,
  },
  textContainer: {
    padding: 8,
  },
  greenText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#096233",
  },
  blackText: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
  },
  redText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#BC022C",
  },
  settingsButton: {
    padding: 8,
  },
});
