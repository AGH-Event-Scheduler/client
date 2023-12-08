import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type ButtonTypes =
  | "primary"
  | "secondary"
  | "destructive"
  | "gray"
  | "toggleDefault"
  | "toggleChecked";

export type ButtonSize = "default" | "small";
interface ButtonProps {
  onPress: () => void;
  type: ButtonTypes;
  title: string;
  size: ButtonSize;
}

export const AppButton = ({ onPress, type, title, size }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        buttonTypes[type].button,
        buttonSizes[size].button,
      ]}
    >
      <Text
        style={[styles.text, buttonTypes[type].text, buttonSizes[size].text]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const buttonTypes: Record<ButtonTypes, { button: any; text: any }> = {
  primary: StyleSheet.create({
    button: {
      backgroundColor: "#096233",
      borderColor: "#096233",
    },
    text: {
      color: "#FFFFFF",
    },
  }),
  secondary: StyleSheet.create({
    button: {
      backgroundColor: "#FAFAFA",
      borderColor: "#096233",
      borderWidth: 2,
      paddingVertical: 6,
      paddingHorizontal: 18,
    },
    text: {
      color: "#096233",
    },
  }),
  destructive: StyleSheet.create({
    button: {
      backgroundColor: "#BC022C",
    },
    text: {
      color: "white",
    },
  }),
  gray: StyleSheet.create({
    button: {
      backgroundColor: "#888989",
    },
    text: {
      color: "white",
    },
  }),
  toggleChecked: StyleSheet.create({
    button: {
      backgroundColor: "#096233",
      borderColor: "#096233",
      borderRadius: 20,
    },
    text: {
      color: "#FFFFFF",
    },
  }),
  toggleDefault: StyleSheet.create({
    button: {
      backgroundColor: "#FAFAFA",
      borderColor: "#096233",
      borderWidth: 2,
      paddingVertical: 6,
      paddingHorizontal: 18,
      borderRadius: 20,
    },
    text: {
      color: "#096233",
    },
  }),
};

const buttonSizes: Record<ButtonSize, { button: any; text: any }> = {
  default: StyleSheet.create({
    button: {
      minWidth: 150,
    },
    text: {
      fontSize: 20,
    },
  }),
  small: StyleSheet.create({
    button: {
      minWidth: 110,
    },
    text: {
      fontSize: 14,
    },
  }),
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
  },
});
