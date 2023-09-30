import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.text}>{name}</Text>
      <Text
        style={styles.text}
      >{`${startDate.getDay()}.${startDate.getMonth()} ${startDate.getHours()}:${startDate.getMinutes()}`}</Text>
      <Text style={styles.text}>{location}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 2,
    marginRight: 2,
    flexDirection: "column",
    alignItems: "center",
    padding: 24,
    borderRadius: 13,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  text: {
    flex: 1,
    marginRight: "5%",
    fontSize: 19,
    fontWeight: "500",
    flexWrap: "wrap",
  },
  likeIconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 15,
  },
  likeIconStyle: {
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
});
