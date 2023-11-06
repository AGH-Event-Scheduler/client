import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { fetchEventDetails } from "../../api/event-api-utils";
import { Organization, OrganizationEvent } from "../../api/types";
import { globalStyles } from "../../styles/GlobalStyles";
import { useTranslation } from "react-i18next";
import { toBeautifiedDateTimeString } from "../../utils/date";
import { LoadingView } from "../../components/loading/LoadingView";
import { EventHubImage } from "../../components/EventHubImage";
import { getOrganizationById } from "../../api/organization-api-utils";

export const EventDetailsView = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState<OrganizationEvent>();
  const [eventOrganization, setEventOrganization] = useState<Organization>();
  const [isLoading, setIsLoading] = useState(true);

  const eventId = route.params.eventId;

  const isFocused = useIsFocused();
  useEffect(() => {
    const getEventDetailsData = async () => {
      setIsLoading(true);
      try {
        const event = await fetchEventDetails(eventId);
        const organization = await getOrganizationById(event.organizationId);
        setEvent(event);
        setEventOrganization(organization);
      } catch (error) {
        console.log("Fetching event details error", error);
      }
      setIsLoading(false);
    };
    isFocused && getEventDetailsData();
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <EventHubImage
              imageId={event.backgroundImage.imageId}
              filename={event.backgroundImage.bigFilename}
            />
          </View>
          <Text style={styles.eventName}>{event?.name}</Text>

          <Text style={styles.date}>{`${toBeautifiedDateTimeString(
            new Date(event?.startDate),
            i18n.language,
          )} - ${toBeautifiedDateTimeString(
            new Date(event?.endDate),
            i18n.language,
          )}`}</Text>
          <Text style={styles.location}>{event?.location}</Text>

          <TouchableOpacity
            style={styles.organizationContainer}
            onPress={() => {
              navigation.navigate("Organization", {
                organizationId: event?.organizationId,
              });
            }}
          >
            <View style={styles.organizationImageContainer}>
              <EventHubImage
                imageId={eventOrganization.logoImage.imageId}
                filename={eventOrganization.logoImage.mediumFilename}
              />
            </View>
            <View style={styles.organizationText}>
              <Text style={styles.organizationName}>
                {eventOrganization.name}
              </Text>
              <Text style={styles.lastEdit}>
                <Text style={{ fontWeight: "bold" }}>{`${t(
                  "event-details.last-edit",
                )}: `}</Text>
                <Text>{`${toBeautifiedDateTimeString(
                  new Date(event?.lastUpdatedDate),
                  i18n.language,
                )}`}</Text>
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.descriptionHeader}>
            {t("general.description")}
          </Text>
          <Text style={styles.description}>{event?.description}</Text>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    display: "flex",
    textAlign: "center",
    width: "100%",
    height: 200,
    overflow: "hidden",
    marginTop: 5,
    marginBottom: 5,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    maxHeight: 200,
  },
  eventName: {
    fontSize: 19,
    fontWeight: "bold",
  },
  date: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#016531",
    paddingVertical: 5,
  },
  location: {
    fontSize: 15,
    fontWeight: "bold",
  },
  organizationContainer: {
    flexDirection: "row",
    marginVertical: 15,
    alignItems: "center",
  },
  organizationText: {
    gap: 3,
  },
  organizationImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 15,
  },
  organizationName: {
    fontWeight: "bold",
    fontSize: 17,
  },
  lastEdit: {},
  descriptionHeader: {
    ...globalStyles.title,
    marginBottom: 10,
  },
  description: {
    ...globalStyles.description,
    marginBottom: 10,
  },
});
