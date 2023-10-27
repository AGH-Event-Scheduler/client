import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  toBeautifiedDateTimeString,
  toBeautifiedTimeString,
} from "../../utils/date";

interface EventListCardProps {
  imageSource: { uri: string };
  name: string;
  location: string;
  startDate: Date;
  onCardPress: () => void;
  style?: any;
}

export const EventOrganizationListCard = ({
  imageSource,
  name,
  location,
  startDate,
  onCardPress,
  style,
}: EventListCardProps) => {
  const handleCardPress = () => {
    onCardPress();
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handleCardPress}
    >
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={[styles.textContainer]}>
        <Text numberOfLines={1} style={styles.text}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.date}>
          {toBeautifiedDateTimeString(startDate)}
        </Text>
        <Text numberOfLines={1} style={styles.location}>
          {location}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
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
  image: {
    flex: 1,
    resizeMode: "cover",
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
});
