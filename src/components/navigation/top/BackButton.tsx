import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

export interface TopNavBarProps {
  navigation: any;
}

export const BackButton = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Feather name={"chevron-left"} style={styles.backButton} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  backButton: {
    color: "#016531",
    fontSize: 25,
  },
});
