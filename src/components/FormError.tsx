import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "../styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons
import { MaterialIcons } from "@expo/vector-icons";

interface FormErrorProps {
  errorText: string;
  style?: any;
}

export const FormError: React.FC<FormErrorProps> = ({
  errorText,
  style = undefined,
}) => {
  return (
    <View style={[styles.errorContainer, style]}>
      <MaterialIcons name="error" size={18} color="red" />
      <Text style={styles.errorText}>{errorText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});
