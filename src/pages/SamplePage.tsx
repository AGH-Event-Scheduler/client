import React from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { AuthenticationService } from "../services/AuthenticationService";

export const SamplePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppButton
        onPress={() => {
          AuthenticationService.logout().then(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Login" }],
              }),
            );
          });
        }}
        type="secondary"
        title={"Hello World"}
        size="default"
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
