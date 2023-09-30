import React, { useState } from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { globalStyles } from "../styles/GlobalStyles";

export const SettingsModal = ({ isVisible, onClose }) => {
  const [language, setLanguage] = useState("Polish");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "Polish" ? "English" : "Polish",
    );
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.settingsContainer}>
            <Text style={globalStyles.title}>Ustawienia</Text>
            <View style={styles.languageToggleContainer}>
              <Text style={globalStyles.description}>Language:</Text>
              <Button title={language} onPress={toggleLanguage} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  settingsContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
  },
  settingsText: {
    ...globalStyles.title,
    textAlign: "center",
    marginBottom: 10,
  },
  languageToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
