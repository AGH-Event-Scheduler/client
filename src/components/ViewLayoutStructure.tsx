import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomNavBar } from "./navigation/bottom/BottomNavBar";

export const ViewLayoutStructure = ({ children, navbarVisible }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>{children}</View>
      {navbarVisible && <BottomNavBar navbarVisible={navbarVisible} />}
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
