import { ViewLayoutStructure } from "../components/ViewLayoutStructure";
import { SamplePage } from "../pages/SamplePage";
import { OrganizationListView } from "../pages/organizations/OrganizationListView";
import { OrganizationDetailsView } from "../pages/organization-details/OrganizationDetailsView";
import { EventDetailsView } from "../pages/event-details/EventDetailsView";
import React from "react";

export const MainStack = ({ stack }) => {
  return (
    <ViewLayoutStructure navbarVisible={true}>
      <stack.Navigator
        screenOptions={{ headerShown: true, animation: "fade" }}
        initialRouteName="Home"
      >
        {/* Main pages */}
        <stack.Screen name="Home" component={SamplePage} />
        {/*<stack.Screen name="Favourite" component={SamplePage}/>*/}
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
        <stack.Screen name="Calendar" component={SamplePage} />
        <stack.Screen name="Feed" component={SamplePage} />
        <stack.Screen name="Settings" component={SamplePage} />
        <stack.Screen name="Create organization" component={SamplePage} />
        <stack.Screen name="Your organizations" component={SamplePage} />
        <stack.Screen name="Organization" component={OrganizationDetailsView} />
        <stack.Screen name="Event" component={EventDetailsView} />
      </stack.Navigator>
    </ViewLayoutStructure>
  );
};
