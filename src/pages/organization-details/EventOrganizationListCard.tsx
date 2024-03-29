import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { toBeautifiedDateTimeString } from "../../utils/date";
import { useTranslation } from "react-i18next";
import { EventHubImage } from "../../components/EventHubImage";
import { Image } from "../../api/types";

interface EventListCardProps {
  image: Image;
  name: string;
  location: string;
  startDate: Date;
  onCardPress: () => void;
  canceled: boolean;
  style?: any;
}

export const EventOrganizationListCard = ({
  image,
  name,
  location,
  startDate,
  onCardPress,
  canceled,
  style,
}: EventListCardProps) => {
  const handleCardPress = () => {
    onCardPress();
  };

  const { t, i18n } = useTranslation();

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handleCardPress}
    >
      <View style={styles.imageContainer}>
        <EventHubImage
          imageId={image.imageId}
          filename={image.mediumFilename}
        />
      </View>
      <View style={[styles.textContainer]}>
        <Text numberOfLines={1} style={styles.text}>
          {name}
        </Text>
        {!canceled ? (
          <View>
            <Text numberOfLines={1} style={styles.date}>
              {toBeautifiedDateTimeString(startDate, i18n.language)}
            </Text>
            <Text numberOfLines={1} style={styles.location}>
              {location}
            </Text>
          </View>
        ) : (
          <Text style={[styles.canceled]}>
            {t("event-details.event-canceled")}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    borderColor: "#D6D6D6",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  imageContainer: {
    width: "100%",
    height: "55%",
    borderRadius: 0,
    overflow: "hidden",
  },
  text: {
    fontSize: 19,
    fontWeight: "bold",
  },
  textContainer: {
    width: "100%",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  date: {
    color: "#016531",
    fontWeight: "bold",
    fontSize: 17,
  },
  location: {
    fontWeight: "bold",
    fontSize: 15,
  },
  canceled: {
    fontSize: 18,
    color: "#BC022C",
    fontWeight: "bold",
  },
});
