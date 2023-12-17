import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppButton } from "../../components/AppButton";
import { TextInputContainer } from "../../components/TextInputContainer";
import { globalStyles } from "../../styles/GlobalStyles";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { AuthenticationService } from "../../services/AuthenticationService";
import { useTranslation } from "react-i18next";
import { authenticate } from "../../api/authentication-api-utils";
import { KeyboardAvoidViewComponent } from "../../components/KeyboardAvoidViewComponent";
import { isLoggedAsAdmin } from "../../api/user-api-utlis";

export const LoginPageView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@(student\.)?agh\.edu\.pl$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert(
        t("login.missing-information"),
        t("login.fill-required-fields"),
      );
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert(t("login.invalid-email"), t("login.valid-email-address"));
      return;
    } else {
      try {
        const response = await authenticate(email, password);
        if (await AuthenticationService.authenticate(response)) {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: "Main" }],
            }),
          );
          await AuthenticationService.setIsAdmin(await isLoggedAsAdmin());
        } else {
          Alert.alert(t("login.login-failed"), t("login.check-email-password"));
        }
      } catch (error) {
        console.error(t("login.login-error"), error);
        Alert.alert(t("login.login-failed"), t("login.check-email-password"));
      }
    }
  };

  const handleSignUp = () => {
    // @ts-ignore
    navigation.navigate("Register");
  };

  const handleForgotPassword = () => {
    // @ts-ignore
    navigation.navigate("Reset Password");
    console.log("Forgot password link pressed");
  };

  const handleContinueAsGuest = () => {
    console.log("Continue as a guest pressed");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titlePart1}>{t("login.welcome-to")}</Text>
        <Text style={styles.titlePart2}> AGH Events Hub</Text>
      </View>
      <KeyboardAvoidViewComponent containerStyles={styles.wrapper}>
        <TextInputContainer
          label={t("login.email-label")}
          placeholder={t("login.email-placeholder")}
          value={email}
          onChangeText={(text) => setEmail(text)}
          description={t("login.AGH-domain-email-address")}
          style={{ marginBottom: 20 }}
        />
        <TextInputContainer
          label={t("login.password-label")}
          placeholder={t("login.password-placeholder")}
          value={password}
          onChangeText={(text) => setPassword(text)}
          description={t("login.password-min-length-description")}
          linkText={t("login.forgot-password-link")}
          onLinkPress={() => handleForgotPassword()}
          isPassword={true}
          style={{ marginBottom: 20 }}
        />

        <View style={styles.dividerContainer}>
          <AppButton
            onPress={handleSignIn}
            type="primary"
            title={t("login.sign-in")}
            size="default"
          />
        </View>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>
            {t("login.no-account-question")}
          </Text>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.dividerTextLink}>{t("login.sign-up")}</Text>
          </TouchableOpacity>
          <View style={styles.dividerLine} />
        </View>

        {/* <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>{t("login.or")}</Text>
        </View>

        <View style={styles.additionalMethodsContainer}>
          <AppButton
            onPress={handleContinueAsGuest}
            type="gray"
            title={t("login.continue-as-guest")}
            size="small"
          />
        </View> */}
      </KeyboardAvoidViewComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  wrapper: {
    flex: 1,
  },
  titleContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "20%",
    marginTop: "10%",
  },
  titlePart1: {
    ...globalStyles.descriptionTitle,
    fontSize: 30,
  },
  titlePart2: {
    ...globalStyles.title,
    fontSize: 35,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
    marginHorizontal: 4,
  },
  dividerText: {
    color: "black",
  },
  dividerTextLink: {
    color: "#016531",
  },
  additionalMethodsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
});
