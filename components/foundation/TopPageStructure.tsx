import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const TopPageStructure = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text>
          <Text style={styles.greenText}>A</Text>
          <Text style={styles.blackText}>G</Text>
          <Text style={styles.redText}>H</Text>
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Feather name="settings" size={24} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "6%",
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

export default TopPageStructure;
