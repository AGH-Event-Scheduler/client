import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { TextInputContainer } from "../../components/TextInputContainer";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { resetPassword } from "../../api/authentication-api-utils";

export const ResetPasswordView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const { t } = useTranslation();
  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@(student\.)?agh\.edu\.pl$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email || !password || !repeatedPassword) {
      Alert.alert(
        t("registration.missing-information"),
        t("registration.all-fields-required"),
      );
      return;
    }
    if (password != repeatedPassword) {
      Alert.alert(
        t("registration.invalid-password"),
        t("registration.password-match-description"),
      );
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert(
        t("registration.invalid-email"),
        t("registration.invalid-email"),
      );
      return;
    } else {
      try {
        const response = await resetPassword(email, password);
        if (response) {
          Alert.alert(t("reset-password.reset-success"), t(""));
          navigation.dispatch(
            CommonActions.navigate("Resend Verification Email"),
          );
        } else {
          Alert.alert(t("reset-password.failed"), t("reset-password.failed"));
        }
      } catch (error) {
        console.error(t("reset-password.failed"), error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInputContainer
        label={t("registration.email-label")}
        placeholder={t("registration.email-placeholder")}
        value={email}
        onChangeText={(text) => setEmail(text)}
        description={t("registration.agh-domain-email-description")}
      />
      <TextInputContainer
        label={t("reset-password.password-label")}
        placeholder={t("registration.password-placeholder")}
        value={password}
        onChangeText={(text) => setPassword(text)}
        description={t("registration.password-min-length-description")}
        isPassword={true}
      />
      <TextInputContainer
        label={t("registration.repeat-password-label")}
        placeholder={t("registration.password-placeholder")}
        value={repeatedPassword}
        onChangeText={(text) => setRepeatedPassword(text)}
        description={t("registration.password-match-description")}
        isPassword={true}
      />

      <View style={styles.dividerContainer}>
        <View style={styles.dividerContainer}>
          <AppButton
            onPress={handleResetPassword}
            type="primary"
            title={t("reset-password.reset-button")}
            size="default"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
});
