import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { fetchEventDetails } from "../../api/EventApiUtils";
import { OrgEvent } from "../../api/types";
import { globalStyles } from "../../styles/GlobalStyles";
import { useTranslation } from "react-i18next";

export const EventDetailsView = ({ navigation, route }) => {
  const {t} = useTranslation();
  const [event, setEvent] = useState<OrgEvent>();

  const eventId = route.params.eventId;

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused && fetchEventDetailsData(eventId);
  }, [isFocused]);

  const fetchEventDetailsData = async (organizationId: number) => {
    try {
      const event = await fetchEventDetails(eventId);
      setEvent(event);
    } catch (error) {
      console.log("Fetching event details error", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: event?.imageUrl }} style={styles.image} />
      </View>
      <Text style={[globalStyles.title, globalStyles.boldText]}>
        {event?.name}
      </Text>
      <Text
        style={[globalStyles.date, globalStyles.boldText]}
      >{`${event?.startDate.getDay()}.${event?.startDate.getMonth()} ${event?.startDate.getHours()}:${event?.startDate.getMinutes()} - ${event?.endDate.getHours()}:${event?.endDate.getMinutes()}`}</Text>
      <Text style={[globalStyles.title]}>{event?.location}</Text>
      <Text style={[globalStyles.descriptionTitle]}>{t('general.description')}</Text>
      <Text style={[globalStyles.description]}>{event?.description}</Text>
    </View>
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
