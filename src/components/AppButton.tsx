import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type ButtonTypes =
  | "primary"
  | "secondary"
  | "destructive"
  | "gray"
  | "toggleDefault"
  | "toggleChecked";

export type ButtonSize = "default" | "medium" | "small";
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
      paddingVertical: "1.5%",
      paddingHorizontal: "5%",
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
      paddingVertical: "1.5%",
      paddingHorizontal: "5%",
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
      minWidth: "45%",
    },
    text: {
      fontSize: 18,
    },
  }),
  small: StyleSheet.create({
    button: {
      minWidth: "30%",
    },
    text: {
      fontSize: 14,
    },
  }),
  medium: StyleSheet.create({
    button: {
      minWidth: "40%"
    }, 
    text: {
      fontSize: 18
    }
  })
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: "2%",
    paddingHorizontal: "5.5%",
    borderRadius: 12,
  },
  text: {
    textAlign: "center",
    fontWeight: "400",
  },
});
