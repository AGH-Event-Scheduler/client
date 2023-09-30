import React from "react";
import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export const SettingsModal = ({ isVisible, onClose }) => {
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
            <Text style={styles.settingsText}>USTAWIENIA</Text>
            <Button title="Zamknij" onPress={onClose} />
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
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
});
