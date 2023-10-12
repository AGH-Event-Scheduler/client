import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export enum ButtonTypes {
  Primary = "primary",
  Secondary = "secondary",
  Destructive = "destructive",
  Disabled = "disabled"
}


interface ButtonProps {
  onPress: () => void;
  type: ButtonTypes;
  title: string;
}

export const AppButton = ({ onPress, type, title }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonTypes[type].button]}
    >
      <Text style={[styles.text, buttonTypes[type].text]}>{title}</Text>
    </TouchableOpacity>
  );
};

const buttonTypes: Record<ButtonTypes, { button: any; text: any }> = {
  primary: StyleSheet.create({
    button: {
      backgroundColor: "#016531",
      borderColor: "#016531",
    },
    text: {
      color: "#FFFFFF",
    },
  }),
  secondary: StyleSheet.create({
    button: {
      backgroundColor: "#FAFAFA",
      borderColor: "#016531",
      borderWidth: 2,
    },
    text: {
      color: "#016531",
    },
  }),
  destructive: StyleSheet.create({
    button: {
      backgroundColor: "red",
    },
    text: {
      color: "white",
    },
  }),
  disabled: StyleSheet.create({
    button: {
      backgroundColor: "grey",
    },
    text: {
      color: "white",
    },
  }),
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "400",
  },
});
