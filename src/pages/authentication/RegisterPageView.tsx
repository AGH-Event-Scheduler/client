import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AppButton } from "../../components/AppButton";
import { TextInputContainer } from "../../components/TextInputContainer";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { register } from "../../api/authentication-api-utils";
import { KeyboardAvoidViewComponent } from "../../components/KeyboardAvoidViewComponent";
import { KeyboardAwareScrollViewComponent } from "../../components/KeyboardAwareScrollViewComponent";

export const RegisterPageView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const { t } = useTranslation();
  const navigation = useNavigation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@(student\.)?agh\.edu\.pl$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !email || !password || !repeatedPassword) {
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
        const response = await register(email, password, firstName, lastName);
        if (response) {
          Alert.alert(t("registration.registration-success"), t(""));
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Resend Verification Email" }],
            }),
          );
        } else {
          Alert.alert(
            t("registration.registration-failed"),
            t("registration.registration-failed"),
          );
        }
      } catch (error) {
        console.error(t("registration.registration-error"), error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollViewComponent containerStyles={styles.wrapper}>
        <TextInputContainer
          label={t("registration.first-name-label")}
          placeholder={t("registration.name-placeholder")}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          description=""
        />
        <TextInputContainer
          label={t("registration.last-name-label")}
          placeholder={t("registration.last-name-placeholder")}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          description=""
        />
        <TextInputContainer
          label={t("registration.email-label")}
          placeholder={t("registration.email-placeholder")}
          value={email}
          onChangeText={(text) => setEmail(text)}
          description={t("registration.agh-domain-email-description")}
        />
        <TextInputContainer
          label={t("registration.password-label")}
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

        <View style={styles.createAccountContainer}>
          <AppButton
            onPress={handleRegister}
            type="primary"
            title={t("registration.register-button")}
            size="default"
          />
        </View>
      </KeyboardAwareScrollViewComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  wrapper: {
    flex: 1,
    padding: 20,
    gap: 20,
  },
  createAccountContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
