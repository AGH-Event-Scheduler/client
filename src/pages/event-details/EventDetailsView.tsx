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
import { OrganizationEvent } from "../../api/types";
import { globalStyles } from "../../styles/GlobalStyles";
import { useTranslation } from "react-i18next";
import { toBeautifiedDateTimeString } from "../../utils/date";
import { LoadingView } from "../../components/loading/LoadingView";

export const EventDetailsView = ({ navigation, route }) => {
  const { t } = useTranslation();
  const [event, setEvent] = useState<OrganizationEvent>();
  const [isLoading, setIsLoading] = useState(true);

  const eventId = route.params.eventId;

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && fetchEventDetailsData();
  }, [isFocused]);

  const fetchEventDetailsData = async () => {
    setIsLoading(true);
    try {
      const event = await fetchEventDetails(eventId);
      setEvent(event);
    } catch (error) {
      console.log("Fetching event details error", error);
    }
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <LoadingView />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: event?.backgroundImage.bigUrl }}
              style={styles.image}
            />
          </View>
          <Text style={styles.eventName}>{event?.name}</Text>

          <Text style={styles.date}>{`${toBeautifiedDateTimeString(
            new Date(event?.startDate),
          )} - ${toBeautifiedDateTimeString(new Date(event?.endDate))}`}</Text>
          <Text style={styles.location}>{event?.location}</Text>

          <TouchableOpacity
            style={styles.organizationContainer}
            onPress={() => {
              navigation.navigate("Organization", {
                organizationId: event.organization.id,
              });
            }}
          >
            <View style={styles.organizationImageContainer}>
              <Image
                source={{ uri: event?.organization.logoImage.smallUrl }}
                style={styles.organizationLogo}
              />
            </View>
            <View style={styles.organizationText}>
              <Text style={styles.organizationName}>
                {event?.organization.name}
              </Text>
              <Text style={styles.lastEdit}>
                <Text style={{ fontWeight: "bold" }}>{`${t(
                  "event-details.last-edit",
                )}: `}</Text>
                <Text>{`${toBeautifiedDateTimeString(
                  new Date(event?.lastUpdatedDate),
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
  organizationLogo: {
    flex: 1,
    resizeMode: "cover",
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
