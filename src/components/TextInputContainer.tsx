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
import { FormError } from "./FormError";

interface TextInputContainerProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  description: string;
  linkText?: string;
  onLinkPress?: () => void;
  maxLength?: number;
  error?: boolean;
  errorText?: string;
  multiline?: boolean;
  isPassword?: boolean; // Indicates whether it's a password input
  style?: any;
}

export const TextInputContainer: React.FC<TextInputContainerProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  description,
  linkText,
  onLinkPress,
  maxLength = 3000,
  multiline = false,
  isPassword = false,
  error = false,
  errorText = "",
  style = undefined,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[globalStyles.descriptionTitle, styles.label]}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            styles.input,
            multiline ? styles.inputMultiline : null,
            error ? styles.inputError : null,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#A1A1A1"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword && isPassword}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={multiline}
          maxLength={maxLength}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.toggleButton}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && errorText ? <FormError errorText={errorText} /> : null}
      <View style={styles.descriptionContainer}>
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
        {linkText && onLinkPress && (
          <TouchableOpacity onPress={onLinkPress}>
            <Text style={styles.linkText}>{linkText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    height: 45,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#D6D5D5",
    backgroundColor: "#F9F9F9",
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
    padding: 10,
    borderRadius: 10,
  },
  inputMultiline: {
    height: 200,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#BC022C",
  },
  errorContainer: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
  },
  errorText: {
    color: "#BC022C",
  },
  toggleButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  description: {
    fontSize: 12,
    color: "#888989",
    flex: 1,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linkText: {
    color: "#016531",
    fontSize: 12,
    marginLeft: 5,
  },
  label: {
    marginBottom: 6
  }
});
