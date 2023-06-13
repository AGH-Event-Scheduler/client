import React from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import TopPageStructure from "./TopPageStructure";

export const ViewLayoutStructure = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopPageStructure />
      <View style={styles.contentContainer}>{children}</View>
      <View style={styles.menuContainer}>
        <View style={styles.menuItem}>
          <AntDesign
            name="star"
            size={24}
            color="black"
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Favourite</Text>
        </View>
        <View style={styles.menuItem}>
          <AntDesign
            name="team"
            size={24}
            color="black"
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Organizations</Text>
        </View>
        <View style={styles.menuItem}>
          <AntDesign
            name="calendar"
            size={24}
            color="black"
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Calendar</Text>
        </View>
        <View style={styles.menuItem}>
          <Entypo
            name="text-document"
            size={24}
            color="black"
            style={styles.menuIcon}
          />
          <Text style={styles.menuText}>Feed</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  contentContainer: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: "10%",
    marginTop: 16,
  },
  menuItem: {
    alignItems: "center",
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
