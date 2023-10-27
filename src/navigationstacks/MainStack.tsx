import { ViewLayoutStructure } from "../components/ViewLayoutStructure";
import { SamplePage } from "../pages/SamplePage";
import { OrganizationListView } from "../pages/organizations/OrganizationListView";
import { OrganizationDetailsView } from "../pages/organization-details/OrganizationDetailsView";
import { EventDetailsView } from "../pages/event-details/EventDetailsView";
import React from "react";
import { SettingsView } from "../pages/settings/SettingsView";
import { EventSearchScreen } from "../pages/event-search/EventSearchScreen";
import { CalendarScreen } from "../pages/calendar/CalendarScreen";
import { AllEventsView } from "../pages/all-events/AllEventsView";

export const MainStack = ({ stack }) => {
  return (
    <ViewLayoutStructure navbarVisible={true}>
      <stack.Navigator
        screenOptions={{ headerShown: true, animation: "fade" }}
        initialRouteName="Home"
      >
        {/* Main pages */}
        <stack.Screen name="Home" component={SamplePage} />
        <stack.Screen name="Favourite">
          {(props) => (
            <OrganizationListView
              {...props}
              navigation={props.navigation || stack.navigation}
              onlySubscribed={true}
            />
          )}
        </stack.Screen>
        <stack.Screen name="Organizations" component={OrganizationListView} />
        <stack.Screen name="Feed" component={SamplePage} />
        <stack.Screen name="Settings" component={SettingsView} />
        <stack.Screen name="Create organization" component={SamplePage} />
        <stack.Screen name="Your organizations" component={SamplePage} />
        <stack.Screen name="Event Search" component={EventSearchScreen} />
        <stack.Screen name="Calendar" component={CalendarScreen} />

        {/* Sub pages */}
        <stack.Screen name="Organization" component={OrganizationDetailsView} />
        <stack.Screen name="Event" component={EventDetailsView} />
        <stack.Screen name="Account" component={SamplePage} />
        <stack.Screen name="Information" component={SamplePage} />
        <stack.Screen name="All events" component={AllEventsView} />
      </stack.Navigator>
    </ViewLayoutStructure>
  );
};
