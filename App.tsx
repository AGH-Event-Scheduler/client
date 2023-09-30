import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrganizationListView } from "./src/pages/organizations/OrganizationListView";
import { ViewLayoutStructure } from "./src/components/ViewLayoutStructure";
import { OrganizationDetailsView } from "./src/pages/organization-details/OrganizationDetailsView";
import { EventDetailsView } from "./src/pages/event-details/EventDetailsView";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ViewLayoutStructure>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="Organizations" component={OrganizationListView} />
          <Stack.Screen
            name="Organization"
            component={OrganizationDetailsView}
          />
          <Stack.Screen name="Event" component={EventDetailsView} />
        </Stack.Navigator>
      </NavigationContainer>
    </ViewLayoutStructure>
  );
}
