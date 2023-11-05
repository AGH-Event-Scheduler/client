import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { I18nextProvider } from "react-i18next";
import i18next from "./src/localization/i18next";
import { MainStack } from "./src/navigationstacks/MainStack";
import { AuthenticationStack } from "./src/navigationstacks/AuthenticationStack";
import { AuthenticationService } from "./src/services/AuthenticationService";
import { refreshAccessToken } from "./src/api/api-utils";
import { authenticate } from "./src/api/authentication-api-utils";

const Stack = createNativeStackNavigator();

export default function App() {
  const [firstScreen, setFirstScreen] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthenticationService.getRefreshToken()
      .then(refreshAccessToken)
      .then(AuthenticationService.authenticate)
      .then((isLoggedIn) => {
        setFirstScreen(isLoggedIn ? "Main" : "Login");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setFirstScreen("Login");
      });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <I18nextProvider i18n={i18next}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={firstScreen}
        >
          <Stack.Screen name="Login">
            {() => <AuthenticationStack stack={createNativeStackNavigator()} />}
          </Stack.Screen>
          <Stack.Screen name="Main">
            {() => <MainStack stack={createNativeStackNavigator()} />}
          </Stack.Screen>
        </Stack.Navigator>
      </I18nextProvider>
    </NavigationContainer>
  );
}
