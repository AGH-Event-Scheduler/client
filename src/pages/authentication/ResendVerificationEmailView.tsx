import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { TextInputContainer } from "../../components/TextInputContainer";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { resendVerificationEmail } from "../../api/authentication-api-utils";
import { navigateToLogInPage } from "../../utils/RootNavigation";

export const ResendVerificationEmailView = () => {
  const [email, setEmail] = useState("");

  const { t } = useTranslation();
  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@(student\.)?agh\.edu\.pl$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert(
        t("registration.missing-information"),
        t("registration.all-fields-required"),
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
        const response = await resendVerificationEmail(email);
        if (response) {
          Alert.alert(t("resend-email.reset-success"), t(""));
        } else {
          Alert.alert(
            t("resend-email.failed"),
            t("resend-email.failed-detail"),
          );
        }
      } catch (error) {
        console.error(t("resend-email.failed"), error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInputContainer
        label={t("resend-email.email-label")}
        placeholder={t("registration.email-placeholder")}
        value={email}
        onChangeText={(text) => setEmail(text)}
        description={t("registration.agh-domain-email-description")}
      />

      <View style={styles.dividerContainer}>
        <AppButton
          onPress={handleResetPassword}
          type="gray"
          title={t("resend-email.resend-button")}
          size="default"
        />
      </View>
      <View style={styles.dividerContainer}>
        <AppButton
          type="primary"
          title={t("resend-email.sign-in")}
          size="default"
          onPress={navigateToLogInPage}
        />
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
