import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const AppLinkButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "#016633",
    fontSize: 16
  }
})