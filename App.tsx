import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrganizationListView } from "./src/pages/organizations/OrganizationListView";
import { ViewLayoutStructure } from "./src/components/ViewLayoutStructure";
import { OrganizationDetailsView } from "./src/pages/organization-details/OrganizationDetailsView";
import { EventDetailsView } from "./src/pages/event-details/EventDetailsView";
import { SamplePage } from "./src/pages/SamplePage";
import { SettingsView } from "./src/pages/settings/SettingsView";
import { I18nextProvider } from "react-i18next";
import i18next from "./src/localization/i18next";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <I18nextProvider i18n={i18next}>
        <ViewLayoutStructure>
          <Stack.Navigator
            screenOptions={{ headerShown: true, animation: "fade" }}
            initialRouteName="Home"
          >
            {/* Main pages */}
            <Stack.Screen name="Home" component={SamplePage} />
            <Stack.Screen name="Favourite" component={SamplePage} />
            <Stack.Screen
              name="Organizations"
              component={OrganizationListView}
            />
            <Stack.Screen name="Calendar" component={SamplePage} />
            <Stack.Screen name="Feed" component={SamplePage} />
            <Stack.Screen name="Settings" component={SettingsView} />
            <Stack.Screen name="Create organization" component={SamplePage} />
            <Stack.Screen name="Your organizations" component={SamplePage} />

            {/* Sub pages */}
            <Stack.Screen
              name="Organization"
              component={OrganizationDetailsView}
            />
            <Stack.Screen name="Event" component={EventDetailsView} />
            <Stack.Screen name="Account" component={SamplePage} />
            <Stack.Screen name="Information" component={SamplePage} />
          </Stack.Navigator>
        </ViewLayoutStructure>
      </I18nextProvider>
    </NavigationContainer>
  );
}
