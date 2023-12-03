import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  cancelEvent,
  fetchEventDetails,
  reactivateEvent,
  removeEventFromCalendar,
  saveEventInCalendar,
} from "../../api/event-api-utils";
import { OrganizationEvent } from "../../api/types";
import { globalStyles } from "../../styles/GlobalStyles";
import { useTranslation } from "react-i18next";
import { toBeautifiedDateTimeString } from "../../utils/date";
import { LoadingView } from "../../components/loading/LoadingView";
import { EventHubImage } from "../../components/EventHubImage";
import { AppCheckButton } from "../../components/AppCheckButton";
import { AppButton } from "../../components/AppButton";
import { useUserRoles } from "../../services/UserContext";

export const EventDetailsView = ({ navigation, route }) => {
  const { t, i18n } = useTranslation();
  const [event, setEvent] = useState<OrganizationEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const eventId = route.params.eventId;

  const isFocused = useIsFocused();
  useEffect(() => {
    const getEventDetailsData = async () => {
      setIsLoading(true);
      try {
        const event = await fetchEventDetails(eventId);
        setEvent(event);
      } catch (error) {
        console.log("Fetching event details error", error);
      }
      setIsLoading(false);
    };
    isFocused && getEventDetailsData();
  }, [isFocused]);

  const handleSaveButtonPress = async () => {
    if (event) {
      try {
        if (event.isSaved) {
          await removeEventFromCalendar(event.id);
        } else {
          await saveEventInCalendar(event.id);
        }
      } catch (error) {
        console.error("Error handling organization subscription:", error);
      }
      setEvent({
        ...event,
        isSaved: !event.isSaved,
      });
    }
  };

  const showConfirmationPopup = () => {
    Alert.alert(
      !event.canceled
        ? t("event-details.confirm-cancel")
        : t("event-details.confirm-reactivate"),
      !event.canceled
        ? t("event-details.confirm-cancel-text")
        : t("event-details.confirm-reactivate-text"),
      [
        {
          text: t("event-details.confirm"),
          onPress: !event.canceled ? handelCancelEvent : handleReactivateEvent,
        },
        {
          text: t("event-details.cancel"),
          onPress: () => {},
        },
      ],
    );
  };

  const handelCancelEvent = async () => {
    setIsLoading(true);
    await cancelEvent(eventId).then(() => {
      event.canceled = true;
    });
    setIsLoading(false);
  };

  const handleReactivateEvent = async () => {
    setIsLoading(true);
    await reactivateEvent(eventId).then(() => {
      event.canceled = false;
    });
    setIsLoading(false);
  };

  const organizationId = event?.underOrganization.id ?? null;
  const { userRoles, hasEditingRole, hasUserManagementRole } =
    useUserRoles(organizationId);

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
          <View style={styles.buttonContainer}>
            {hasEditingRole ? (
              <AppButton
                onPress={() => {
                  navigation.navigate("Update Event", {
                    organizationId: event.underOrganization.id,
                    editingEventId: event.id,
                  });
                }}
                title={t("event-details.edit-event")}
                type="secondary"
                size="default"
              />
            ) : null}
            {hasEditingRole ? (
              <AppButton
                onPress={showConfirmationPopup}
                title={
                  !event.canceled
                    ? t("event-details.cancel-event")
                    : t("event-details.reactivate-event")
                }
                type={!event.canceled ? "destructive" : "gray"}
                size="default"
              />
            ) : null}
            <AppCheckButton
              onPress={handleSaveButtonPress}
              title={t("event-details.save")}
              altTitle={t("event-details.saved")}
              isChecked={event.isSaved}
            />
          </View>

          <Text style={styles.eventName}>{event?.nameTranslated}</Text>

          {!event.canceled ? (
            <View>
              <Text style={styles.date}>{`${toBeautifiedDateTimeString(
                new Date(event?.startDate),
                i18n.language,
              )} - ${toBeautifiedDateTimeString(
                new Date(event?.endDate),
                i18n.language,
              )}`}</Text>
              <Text style={styles.location}>{event?.locationTranslated}</Text>
            </View>
          ) : (
            <Text style={[styles.canceled]}>
              {t("event-details.event-canceled")}
            </Text>
          )}

          <TouchableOpacity
            style={styles.organizationContainer}
            onPress={() => {
              navigation.navigate("Organization", {
                organizationId: event?.underOrganization.id,
              });
            }}
          >
            <View style={styles.organizationImageContainer}>
              <EventHubImage
                imageId={event.underOrganization.logoImage.imageId}
                filename={event.underOrganization.logoImage.mediumFilename}
              />
            </View>
            <View style={styles.organizationText}>
              <Text style={styles.organizationName}>
                {event?.underOrganization.name}
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
          <Text style={styles.description}>{event?.descriptionTranslated}</Text>
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
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: 10,
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
  canceled: {
    fontSize: 18,
    color: "#BC022C",
    fontWeight: "bold",
  },
});
