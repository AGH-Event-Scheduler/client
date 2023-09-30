import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { BottomNavBar } from "./navigation/BottomNavBar";
import { TopNavBar } from "./navigation/TopNavBar";

export const ViewLayoutStructure = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TopNavBar />
      <View style={styles.contentContainer}>{children}</View>
      <BottomNavBar></BottomNavBar>
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
});
