import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { AppButton } from "../../components/AppButton";
import { AuthenticationService } from "../../services/AuthenticationService";
import { useTranslation } from "react-i18next";
import { logout } from "../../api/authentication-api-utils";

export const AccountView = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const user = {
    email: "user@example.com",
    name: "John",
    surname: "Doe", // Displaying passwords is generally not recommended
  };

  return (
    <View style={styles.container}>
      {/* Display User Information */}
      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>{t("settings.account-details.name")}:</Text>
        <Text style={styles.value}>{user.name + " " + user.surname}</Text>

        <Text style={styles.label}>{t("settings.account-details.email")}:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      {/* Sign Out Button */}
      <AppButton
        onPress={async () => {
          await logout().then((loggedOut) => {
            if (loggedOut) {
              AuthenticationService.logout().then(() => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Login" }],
                  }),
                );
              });
            } else {
              Alert.alert("Error during logging out");
            }
          });
        }}
        type="destructive"
        title={t("settings.account-details.sign-out")}
        size="default"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  userInfoContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 15,
  },
});
