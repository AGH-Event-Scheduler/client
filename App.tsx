import React, { ComponentType } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { OrganizationListView } from "./src/pages/organizations/OrganizationListView";
import { ViewLayoutStructure } from "./src/components/ViewLayoutStructure";
import { OrganizationDetailsView } from "./src/pages/organization-details/OrganizationDetailsView";
import { EventDetailsView } from "./src/pages/event-details/EventDetailsView";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SamplePage } from "./src/pages/SamplePage";
import { createStackNavigator } from "@react-navigation/stack";

type SharedScreen = {
  screen: ComponentType<any>;
  title: string;
};

type SharedScreens = Record<string, SharedScreen>;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const SHARED_SCREENS: SharedScreens = {
  StackEvent: { screen: EventDetailsView, title: "Event" },
  StackOrganization: { screen: OrganizationDetailsView, title: "Organization" },
};

export default function App() {
  return (
    <ViewLayoutStructure>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Feed"
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen
            name="Favourite"
            component={createMainScreenNavigator(
              "StackFavourite",
              "Favourite",
              SamplePage,
              SHARED_SCREENS,
            )}
          />
          <Tab.Screen
            name="Organizations"
            component={createMainScreenNavigator(
              "StackOrganizations",
              "Organizations",
              OrganizationListView,
              SHARED_SCREENS,
            )}
          />
          <Tab.Screen
            name="Calendar"
            component={createMainScreenNavigator(
              "StackCalendar",
              "Calendar",
              SamplePage,
              SHARED_SCREENS,
            )}
          />
          <Tab.Screen
            name="Feed"
            component={createMainScreenNavigator(
              "StackCalendar",
              "Calendar",
              SamplePage,
              SHARED_SCREENS,
            )}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ViewLayoutStructure>
  );
}

function createMainScreenNavigator(
  mainScreenName: string,
  mainScreenTitle: string,
  MainScreenComponent: ComponentType<any>,
  sharedScreens: SharedScreens,
): ComponentType<any> {
  return function MainScreenNavigator() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name={mainScreenName}
          component={MainScreenComponent}
          options={{ title: mainScreenTitle }}
        />
        {Object.entries(sharedScreens).map(
          ([screenName, { screen, title }]) => (
            <Stack.Screen
              name={screenName}
              component={screen}
              options={{ title: title }}
            />
          ),
        )}
      </Stack.Navigator>
    );
  };
}
