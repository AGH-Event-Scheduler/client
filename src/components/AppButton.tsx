import React from "react";
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

type ButtonTypes =
  | "primary"
  | "secondary"
  | "destructive"
  | "disabled"
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
      paddingVertical: 6,
      paddingHorizontal: 18,
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
  toggleChecked: StyleSheet.create({
    button: {
      backgroundColor: "#016531",
      borderColor: "#016531",
      borderRadius: 20,
    },
    text: {
      color: "#FFFFFF",
    },
  }),
  toggleDefault: StyleSheet.create({
    button: {
      backgroundColor: "#FAFAFA",
      borderColor: "#016531",
      borderWidth: 2,
      paddingVertical: 6,
      paddingHorizontal: 18,
      borderRadius: 20,
    },
    text: {
      color: "#016531",
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
      fontSize: 16,
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
