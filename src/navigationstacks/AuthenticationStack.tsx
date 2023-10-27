import { useTranslation } from "react-i18next";
import { ViewLayoutStructure } from "../components/ViewLayoutStructure";
import { LoginPageView } from "../pages/authentication/LoginPageView";
import React from "react";

// Move the Stack creation outside the component

export const AuthenticationStack = ({ stack }) => {
  const { t } = useTranslation();

  return (
    <ViewLayoutStructure navbarVisible={false}>
      <stack.Navigator
        screenOptions={{ headerShown: true, animation: "fade" }}
        initialRouteName="Log in"
      >
        {/* Main pages */}
        <stack.Screen
          name="Log in"
          component={LoginPageView}
          options={{ title: t("general.login") }}
        />
      </stack.Navigator>
    </ViewLayoutStructure>
  );
};
