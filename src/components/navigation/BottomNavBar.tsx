import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Feather} from "@expo/vector-icons";

export const BottomNavBar = () => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuItem}>
        <Feather name="star" size={24} color="black" style={styles.menuIcon}/>
        <Text style={styles.menuText}>Favourite</Text>
      </View>
      <View style={styles.menuItem}>
        <Feather name="users" size={24} color="black" style={styles.menuIcon}/>
        <Text style={styles.menuText}>Organizations</Text>
      </View>
      <View style={styles.menuItem}>
        <Feather
          name="calendar"
          size={24}
          color="black"
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>Calendar</Text>
      </View>
      <View style={styles.menuItem}>
        <Feather
          name="feather"
          size={24}
          color="black"
          style={styles.menuIcon}
        />
        <Text style={styles.menuText}>Feed</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 16,
  },
  menuItem: {
    alignItems: "center",
    minWidth: "20%",
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
