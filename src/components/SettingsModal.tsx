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
import { useTranslation } from "react-i18next";
import i18next from "../localization/i18next";

export const SettingsModal = ({ isVisible, onClose }) => {
  const [language, setLanguage] = useState("pl");
  const { t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "pl" ? "en" : "pl"));
    console.log(language);
    i18next.changeLanguage(language);
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
            <Text style={globalStyles.title}>{t("general.settings")}</Text>
            <View style={styles.languageToggleContainer}>
              <Text style={globalStyles.description}>
                {t("general.language")}:
              </Text>
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
