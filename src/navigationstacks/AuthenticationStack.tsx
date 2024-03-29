import { useTranslation } from "react-i18next";
import { ViewLayoutStructure } from "../components/ViewLayoutStructure";
import { LoginPageView } from "../pages/authentication/LoginPageView";
import { getHeaderTitle } from "@react-navigation/elements";
import React from "react";
import { TopNavBar } from "../components/navigation/top/TopNavBar";
import { BackButton } from "../components/navigation/top/BackButton";
import { TopNavBarRightLogin } from "../components/navigation/top/TopNavBarRightLogin";
import { Platform } from "react-native";
import { RegisterPageView } from "../pages/authentication/RegisterPageView";
import { ResetPasswordView } from "../pages/authentication/ResetPasswordView";
import { ResendVerificationEmailView } from "../pages/authentication/ResendVerificationEmailView";

export const AuthenticationStack = ({ stack }) => {
  const { t } = useTranslation();
  const animationType = Platform.OS === "ios" ? "none" : "fade";

  return (
    <ViewLayoutStructure navbarVisible={false}>
      <stack.Navigator
        screenOptions={{
          headerShown: true,
          animation: animationType,
          header: ({ navigation, route, options, back }) => {
            const title = getHeaderTitle(options, route.name);

            return (
              <TopNavBar
                leftSection={
                  back ? <BackButton navigation={navigation} /> : undefined
                }
                rightSection={<TopNavBarRightLogin />}
                title={title}
              />
            );
          },
        }}
        initialRouteName="Log in"
      >
        {/* Main pages */}
        <stack.Screen
          name="Log in"
          component={LoginPageView}
          options={{ title: t("general.login") }}
        />
        <stack.Screen
          name="Register"
          component={RegisterPageView}
          options={{ title: t("general.register") }}
        />
        <stack.Screen
          name="Reset Password"
          component={ResetPasswordView}
          options={{ title: t("general.reset-password") }}
        />
        <stack.Screen
          name="Resend Verification Email"
          component={ResendVerificationEmailView}
          options={{ title: t("general.resend-verification-email") }}
        />
      </stack.Navigator>
    </ViewLayoutStructure>
  );
};
