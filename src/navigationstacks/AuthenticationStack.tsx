import { useTranslation } from "react-i18next";
import { ViewLayoutStructure } from "../components/ViewLayoutStructure";
import { LoginPageView } from "../pages/authentication/LoginPageView";
import { getHeaderTitle } from "@react-navigation/elements";
import React from "react";
import { TopNavBar } from "../components/navigation/top/TopNavBar";
import { BackButton } from "../components/navigation/top/BackButton";
import { TopNavBarRightLogin } from "../components/navigation/top/TopNavBarRightLogin";
import { Platform } from "react-native";

// Move the Stack creation outside the component

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
      </stack.Navigator>
    </ViewLayoutStructure>
  );
};
