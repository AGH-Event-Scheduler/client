import React from "react";
import {StyleSheet, View} from "react-native";
import {AppButton} from "../components/AppButton";

export const SamplePage = () => {
  return (
    <View style={styles.container}>
      <AppButton
        onPress={() => {
        }}
        type="secondary"
        title={"Hello World"}
      ></AppButton>
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
