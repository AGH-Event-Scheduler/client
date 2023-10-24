import React from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "../components/AppButton";
import { AuthenticationService } from "../services/AuthenticationService";
import { useNavigation } from "@react-navigation/native";

export const SamplePage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <AppButton
        onPress={() => {
          // @ts-ignore
          AuthenticationService.removeAuthToken().then(() =>
            navigation.navigate("Login"),
          );
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
