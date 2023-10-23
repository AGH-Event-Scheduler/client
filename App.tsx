import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { OrganizationListView } from "./src/pages/organizations/OrganizationListView";
import { ViewLayoutStructure } from "./src/components/ViewLayoutStructure";
import { OrganizationDetailsView } from "./src/pages/organization-details/OrganizationDetailsView";
import { EventDetailsView } from "./src/pages/event-details/EventDetailsView";
import { SamplePage } from "./src/pages/SamplePage";
import { CalendarScreen } from "./src/pages/calendar/CalendarScreen";
import { EventSearchScreen } from "./src/pages/event-search/EventSearchScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ViewLayoutStructure>
        <Stack.Navigator
          screenOptions={{ headerShown: true, animation: "fade" }}
          initialRouteName="Home"
        >
          {/* Main pages */}
          <Stack.Screen name="Home" component={SamplePage} />
          <Stack.Screen name="Favourite" component={SamplePage} />
          <Stack.Screen name="Organizations" component={OrganizationListView} />
          <Stack.Screen name="Calendar" component={CalendarScreen} />
          <Stack.Screen name="Feed" component={SamplePage} />
          <Stack.Screen name="Settings" component={SamplePage} />
          <Stack.Screen name="Create organization" component={SamplePage} />
          <Stack.Screen name="Your organizations" component={SamplePage} />
          <Stack.Screen name="Event Search" component={EventSearchScreen} />

          {/* Sub pages */}
          <Stack.Screen
            name="Organization"
            component={OrganizationDetailsView}
          />
          <Stack.Screen name="Event" component={EventDetailsView} />
        </Stack.Navigator>
      </ViewLayoutStructure>
    </NavigationContainer>
  );
}
