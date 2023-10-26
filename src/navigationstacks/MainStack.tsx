import { ViewLayoutStructure } from "../components/ViewLayoutStructure";
import { SamplePage } from "../pages/SamplePage";
import { OrganizationListView } from "../pages/organizations/OrganizationListView";
import { OrganizationDetailsView } from "../pages/organization-details/OrganizationDetailsView";
import { EventDetailsView } from "../pages/event-details/EventDetailsView";
import React from "react";
import { SettingsView } from "../pages/settings/SettingsView";
import { EventSearchScreen } from "../pages/event-search/EventSearchScreen";
import { CalendarScreen } from "../pages/calendar/CalendarScreen";
import { useTranslation } from "react-i18next";
import { OrganizationSearchScreen } from "../pages/organization-search/OrganizationSearchScreen";
import { AllEventsView } from "../pages/all-events/AllEventsView";

export const MainStack = ({ stack }) => {
  const { t } = useTranslation();

  return (
    <ViewLayoutStructure navbarVisible={true}>
      <stack.Navigator
        screenOptions={{ headerShown: true, animation: "fade" }}
        initialRouteName="Home"
      >
        {/* Main pages */}
        <stack.Screen
          name="Home"
          component={SamplePage}
          options={{ title: "Home" }}
        />
        <stack.Screen
          name="Favourite"
          options={{ title: t("general.favourite") }}
        >
          {(props) => (
            <OrganizationListView
              {...props}
              navigation={props.navigation || stack.navigation}
              onlySubscribed={true}
            />
          )}
        </stack.Screen>
        <stack.Screen
          name="Organizations"
          component={OrganizationListView}
          options={{ title: t("general.organizations") }}
        />
        <stack.Screen
          name="Feed"
          component={SamplePage}
          options={{ title: t("general.feed") }}
        />
        <stack.Screen
          name="Settings"
          component={SettingsView}
          options={{ title: t("general.settings") }}
        />
        <stack.Screen
          name="Create organization"
          component={SamplePage}
          options={{ title: t("general.create-organization") }}
        />
        <stack.Screen
          name="Your organizations"
          component={SamplePage}
          options={{ title: t("general.your-organizations") }}
        />
        <stack.Screen
          name="Event Search"
          component={EventSearchScreen}
          options={{ title: t("general.event-search") }}
        />
        <stack.Screen
          name="Organization Search"
          component={OrganizationSearchScreen}
          options={{ title: t("general.organization-search") }}
        />
        <stack.Screen
          name="Calendar"
          component={CalendarScreen}
          options={{ title: t("general.calendar") }}
        />

        {/* Sub pages */}
        <stack.Screen
          name="Organization"
          component={OrganizationDetailsView}
          options={{ title: t("general.organization") }}
        />
        <stack.Screen
          name="All events"
          component={AllEventsView}
          options={{ title: t("general.all-events") }}
        />
        <stack.Screen
          name="Event"
          component={EventDetailsView}
          options={{ title: t("general.event") }}
        />
        <stack.Screen
          name="Account"
          component={SamplePage}
          options={{ title: t("settings.account") }}
        />
        <stack.Screen
          name="Information"
          component={SamplePage}
          options={{ title: t("settings.information") }}
        />
      </stack.Navigator>
    </ViewLayoutStructure>
  );
};
