import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrganizationListView } from "./src/pages/organizations/OrganizationListView";
import { ViewLayoutStructure } from "./src/components/ViewLayoutStructure";
import { OrganizationDetailsView } from "./src/pages/organization-details/OrganizationDetailsView";
import { EventDetailsView } from "./src/pages/event-details/EventDetailsView";
import { SamplePage } from "./src/pages/SamplePage";
import { LoginPageView } from "./src/pages/authentication/LoginPageView";
import { UserService } from "./src/services/UserService";

const Stack = createNativeStackNavigator();

export default function App() {
  const [firstScreen, setFirstScreen] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    UserService.getLoginStatus()
      .then((isLoggedIn) => {
        setFirstScreen(isLoggedIn ? "Main" : "Login");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setFirstScreen("Login");
        console.error(err)
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
        <Stack.Screen name="Login" component={AuthenticationStack} />
        <Stack.Screen name="Main" component={MainStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const MainStack = () => {
  return (
    <ViewLayoutStructure navbarVisible={true}>
      <Stack.Navigator
        screenOptions={{ headerShown: true, animation: "fade" }}
        initialRouteName="Home"
      >
        {/* Main pages */}
        <Stack.Screen name="Home" component={SamplePage} />
        <Stack.Screen name="Favourite" component={SamplePage} />
        <Stack.Screen name="Organizations" component={OrganizationListView} />
        <Stack.Screen name="Calendar" component={SamplePage} />
        <Stack.Screen name="Feed" component={SamplePage} />
        <Stack.Screen name="Settings" component={SamplePage} />
        <Stack.Screen name="Create organization" component={SamplePage} />
        <Stack.Screen name="Your organizations" component={SamplePage} />
        <Stack.Screen name="Organization" component={OrganizationDetailsView} />
        <Stack.Screen name="Event" component={EventDetailsView} />
      </Stack.Navigator>
    </ViewLayoutStructure>
  );
};

const AuthenticationStack = () => {
  return (
    <ViewLayoutStructure navbarVisible={false}>
      <Stack.Navigator
        screenOptions={{ headerShown: true, animation: "fade" }}
        initialRouteName="Log in"
      >
        {/* Main pages */}
        <Stack.Screen name="Log in" component={LoginPageView} />
      </Stack.Navigator>
    </ViewLayoutStructure>
  );
};
