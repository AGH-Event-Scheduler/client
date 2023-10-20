import React from "react";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { resetToRouteName } from "./navigation/BottomNavBar";

export const AppNewPageButton = ({ page }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    resetToRouteName(navigation, page);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Feather name={"chevron-right"} size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 5,
    paddingLeft: 30,
  },
});
