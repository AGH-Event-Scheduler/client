import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

export const NavBarButton = ({ name, iconName, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.menuItem}>
        <Feather
          name={iconName}
          size={24}
          color="black"
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    alignItems: "center",
    minWidth: "20%",
    paddingVertical: 5,
  },
  menuIcon: {
    marginBottom: 8,
  },
  menuText: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
});
