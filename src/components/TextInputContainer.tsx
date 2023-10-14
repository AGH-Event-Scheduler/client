import React, {useState} from "react";
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../styles/GlobalStyles";
import {Ionicons} from "@expo/vector-icons"; // Make sure to install @expo/vector-icons

interface TextInputContainerProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  description: string;
  linkText?: string;
  onLinkPress?: () => void;
  isPassword?: boolean; // Indicates whether it's a password input
}

export const TextInputContainer: React.FC<TextInputContainerProps> = ({
                                                                        label,
                                                                        placeholder,
                                                                        value,
                                                                        onChangeText,
                                                                        description,
                                                                        linkText,
                                                                        onLinkPress,
                                                                        isPassword = false,
                                                                      }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={globalStyles.descriptionTitle}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword && isPassword}
        />
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.linkContainer}>
        <Text style={styles.description}>{description}</Text>
        {linkText && onLinkPress && (
          <TouchableOpacity onPress={onLinkPress}>
            <Text style={styles.forgotPasswordLink}>{linkText}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    width: "100%",
    height: 45,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#D6D5D5",
    backgroundColor: "#F9F9F9",
    elevation: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 1,
    shadowRadius: 4,
    padding: 10,
    borderRadius: 10,
  },
  toggleButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  description: {
    fontSize: 12,
    color: "gray",
    flex: 1,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  forgotPasswordLink: {
    color: "#016531",
    fontSize: 12,
    marginLeft: 5,
  },
});