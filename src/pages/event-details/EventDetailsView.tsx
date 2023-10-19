import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { fetchEventDetails } from "../../api/event-api-utils";
import { Event } from "../../api/types";
import { globalStyles } from "../../styles/GlobalStyles";
import { useTranslation } from "react-i18next";

export const EventDetailsView = ({ route }) => {
  const [event, setEvent] = useState<Event>();
  const { t } = useTranslation();

  const eventId = route.params.eventId;

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && fetchEventDetailsData();
  }, [isFocused]);

  const fetchEventDetailsData = async () => {
    try {
      const event = await fetchEventDetails(eventId);
      setEvent(event);
    } catch (error) {
      console.log("Fetching event details error", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: event?.backgroundImage.bigUrl }}
          style={styles.image}
        />
      </View>
      <Text style={[globalStyles.title, globalStyles.boldText]}>
        {event?.name}
      </Text>

      <Text style={[globalStyles.title]}>{event?.location}</Text>
      <Text style={[globalStyles.descriptionTitle]}>
        {t("general.description")}
      </Text>
      <Text style={[globalStyles.description]}>{event?.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
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
});
