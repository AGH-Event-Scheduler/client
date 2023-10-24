import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavBar } from "./navigation/BottomNavBar";
import { TopNavBar } from "./navigation/TopNavBar";

export const ViewLayoutStructure = ({ children, navbarVisible }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar />
      <View style={styles.contentContainer}>{children}</View>
      {navbarVisible && <BottomNavBar />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    width: "100%",
    alignSelf: "center",
  },
  contentContainer: {
    flex: 1,
    width: "95%",
    alignSelf: "center",
  },
});
