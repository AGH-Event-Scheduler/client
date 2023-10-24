import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthenticationService } from "./src/services/AuthenticationService";
import { MainStack } from "./src/navigationstacks/MainStack";
import { AuthenticationStack } from "./src/navigationstacks/AuthenticationStack";

const Stack = createNativeStackNavigator();

export default function App() {
  const [firstScreen, setFirstScreen] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthenticationService.getLoginStatus()
      .then((isLoggedIn) => {
        setFirstScreen(isLoggedIn ? "Main" : "Login");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setFirstScreen("Login");
        console.error(err);
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
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "fade" }}
        initialRouteName={firstScreen}
      >
        <Stack.Screen name="Login">
          {() => <AuthenticationStack stack={Stack} />}
        </Stack.Screen>
        <Stack.Screen name="Main">
          {() => <MainStack stack={Stack} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
