import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { SettingsModal } from "../SettingsModal";

export const TopNavBar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>
          <Text style={styles.greenText}>A</Text>
          <Text style={styles.blackText}>G</Text>
          <Text style={styles.redText}>H</Text>
        </Text>
      </View>
      <TouchableOpacity onPress={toggleSettings} style={styles.iconContainer}>
        <Feather name="settings" size={24} color="black" />
      </TouchableOpacity>
      <SettingsModal isVisible={isSettingsOpen} onClose={closeSettings} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "4%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingRight: 16,
  },
  textContainer: {
    marginRight: 8,
  },
  greenText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#096233",
  },
  blackText: {
    fontSize: 22,
    fontWeight: "600",
    color: "black",
  },
  redText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#BC022C",
  },
  iconContainer: {
    marginLeft: 8,
  },
});
