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
import { TopNavBarRight } from "../components/navigation/top/TopNavBarRight";
import { getHeaderTitle } from "@react-navigation/elements";
import { TopNavBar } from "../components/navigation/top/TopNavBar";
import { BackButton } from "../components/navigation/top/BackButton";
import { Platform } from "react-native";
import { CreateUpdateEventScreen } from "../pages/create-event/CreateUpdateEventScreen";
import { FeedScreen } from "../pages/feed/FeedScreen";
import { CreateUpdateOrganizationView } from "../pages/create-organization/CreateUpdateOrganizationView";

export const MainStack = ({ stack }) => {
  const { t } = useTranslation();
  const animationType = Platform.OS === "ios" ? "none" : "fade";

  return (
    <ViewLayoutStructure navbarVisible={true}>
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
                rightSection={<TopNavBarRight />}
                title={title}
              />
            );
          },
        }}
        initialRouteName="Calendar"
      >
        {/* Main pages */}
        <stack.Screen
          name="Home"
          component={SamplePage}
          options={{ title: "Calendar" }}
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
          component={FeedScreen}
          options={{ title: t("general.feed") }}
        />
        <stack.Screen
          name="Settings"
          component={SettingsView}
          options={{ title: t("general.settings") }}
        />
        <stack.Screen
          name="Create organization"
          component={CreateUpdateOrganizationView}
          options={{ title: t("general.create-organization") }}
        />
        <stack.Screen
          name="Your organizations"
          options={{ title: t("general.your-organizations") }}
        >
          {(props) => (
            <OrganizationListView
              {...props}
              navigation={props.navigation || stack.navigation}
              yourOrganizations={true}
            />
          )}
        </stack.Screen>
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
          name="ChangePassword"
          component={SamplePage}
          options={{ title: t("settings.account.change-password") }}
        />
        <stack.Screen
          name="Information"
          component={SamplePage}
          options={{ title: t("settings.information") }}
        />
        <stack.Screen
          name="Create Event"
          component={CreateUpdateEventScreen}
          options={{ title: t("general.create-event") }}
        />
        <stack.Screen
          name="Update Event"
          component={CreateUpdateEventScreen}
          options={{ title: t("general.update-event") }}
        />
      </stack.Navigator>
    </ViewLayoutStructure>
  );
};
