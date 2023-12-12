import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { EventOrganizationListCard } from "./EventOrganizationListCard";
import { globalStyles } from "../../styles/GlobalStyles";
import { Organization, OrganizationEvent } from "../../api/types";
import { fetchOrganizationEvents } from "../../api/event-api-utils";
import {
  fetchOrganizationById,
  subscribeToOrganization,
  unsubscribeFromOrganization,
} from "../../api/organization-api-utils";
import { AppCheckButton } from "../../components/AppCheckButton";
import { useTranslation } from "react-i18next";
import { AppLinkButton } from "../../components/AppLinkButton";
import { AllEventsViewTypeOption } from "../all-events/AllEventsView";
import { LoadingView } from "../../components/loading/LoadingView";
import { AppButton } from "../../components/AppButton";
import { EventHubImage } from "../../components/EventHubImage";
import {
  hasHeadRole,
  useUserRoles,
} from "../../services/UserContext";
import { AppSelectableText } from "../../components/AppSelectableText";

export const OrganizationDetailsView = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [organization, setOrganization] = useState<Organization>(null);
  const [events, setEvents] = useState<OrganizationEvent[]>([]);
  const [organizationIsLoading, setOrganizationIsLoading] = useState(true);
  const [eventsAreLoading, setEventsAreLoading] = useState(true);
  const isFocused = useIsFocused();

  const organizationId = route.params.organizationId;
  const { userRoles, hasEditingRole, hasUserManagementRole } =
    useUserRoles(organizationId);

  useEffect(() => {
    const fetchOrganizationDetailsData = async (organizationId: number) => {
      try {
        setOrganizationIsLoading(true);
        setEventsAreLoading(true);

        const organization = await fetchOrganizationById(organizationId);
        setOrganization(organization);
        setOrganizationIsLoading(false);

        const events = await fetchOrganizationEvents(
          organizationId,
          AllEventsViewTypeOption.Upcoming,
        );
        setEvents(events);
        setEventsAreLoading(false);
      } catch (error) {
        console.log("Fetching organization details error", error);
        setOrganizationIsLoading(false);
        setEventsAreLoading(false);
      }
    };

    isFocused && fetchOrganizationDetailsData(organizationId);
  }, [isFocused]);

  const handleCardPress = (event: OrganizationEvent) => {
    console.log(`Clicked card: ${event.nameTranslated}`);
    navigation.navigate("Event", { eventId: event.id });
  };

  const handleFollowButtonPress = async () => {
    if (organization) {
      try {
        if (organization.isSubscribed === false) {
          await subscribeToOrganization(organization.id);
        } else {
          await unsubscribeFromOrganization(organization.id);
        }
      } catch (error) {
        console.error("Error handling organization subscription:", error);
      }
      setOrganization({
        ...organization,
        isSubscribed: !organization.isSubscribed,
      });
    }
  };

  const handleSeeAllEventsPress = () => {
    navigation.navigate("All events", { organizationId: organization.id });
  };

  return (
    <View style={{ flex: 1 }}>
      {organizationIsLoading ? (
        <LoadingView />
      ) : (
        <ScrollView style={styles.container}>
          <View style={globalStyles.imageContainer}>
            <EventHubImage
              imageId={organization?.backgroundImage.imageId}
              filename={organization?.backgroundImage.bigFilename}
            />
          </View>
          <View style={styles.buttonContainer}>
            {hasEditingRole ? (
              <AppButton
                onPress={() => {
                  navigation.navigate("Create Event", {
                    organizationId: organization.id,
                  });
                }}
                type="primary"
                title={t("general.create-event")}
                size="medium"
              />
            ) : null}
            {!hasHeadRole(userRoles)
              ? organization && (
                  <AppCheckButton
                    onPress={handleFollowButtonPress}
                    title={t("organization-details.follow")}
                    altTitle={t("organization-details.following")}
                    isChecked={organization.isSubscribed}
                    size="medium"
                  />
                )
              : null}
            {hasHeadRole(userRoles) ? (
              <AppButton
                onPress={() => {
                  navigation.navigate("Update organization", {
                    organizationId: organization.id,
                  });
                }}
                type="secondary"
                title={t("general.edit")}
                size="medium"
              />
            ) : null}
            {hasUserManagementRole ? (
              <AppButton
                onPress={() => {
                  navigation.navigate("Manage Organization Members", {
                    organizationId: organization.id,
                  });
                }}
                type="secondary"
                title={t("organization-details.manage-users")}
                size="default"
              />
            ) : null}
          </View>
          <Text style={styles.title}>{organization?.name}</Text>
          <AppSelectableText text={organization?.description} />
          <View style={[styles.eventContainer]}>
            {events.length !== 0 ? (
              <AppLinkButton
                title={t("all-events.see-all")}
                onPress={handleSeeAllEventsPress}
                style={{ alignSelf: "flex-end" }}
              />
            ) : null}
            {eventsAreLoading ? (
              <LoadingView />
            ) : (
              <FlatList
                data={events}
                keyExtractor={(item) => item.id?.toString()}
                horizontal={true}
                renderItem={({ item }) => (
                  <EventOrganizationListCard
                    image={item?.backgroundImage}
                    name={item?.nameTranslated}
                    location={item?.locationTranslated}
                    onCardPress={() => handleCardPress(item)}
                    startDate={new Date(item?.startDate)}
                    canceled={item?.canceled}
                    style={styles.card}
                  />
                )}
                showsVerticalScrollIndicator={true}
              />
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 200,
    marginHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-evenly",
    gap: 5,
  },
  title: {
    ...globalStyles.title,
    marginTop: 10,
    marginBottom: 10,
  },
  eventContainer: {
    flex: 1,
    width: "100%",
    marginVertical: 20,
    alignItems: "center",
    gap: 10,
  },
});
