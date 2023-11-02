import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const LoadingView = ({ style = undefined }) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
});
