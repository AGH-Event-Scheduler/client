import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface OrganizationListCardProps {
  imageSource: { uri: string };
  text: string;
  isSubscribed: boolean;
  onCardPress: () => void;
  onStarPress: () => void;
  style?: any;
}

export const OrganizationListCard = ({
  imageSource,
  text,
  isSubscribed,
  onCardPress,
  onStarPress,
  style,
}: OrganizationListCardProps) => {
  const handleCardPress = () => {
    onCardPress();
  };

  const handleStarPress = () => {
    onStarPress();
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={handleCardPress}
    >
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.text}>{text}</Text>
      <TouchableOpacity
        style={styles.likeIconContainer}
        onPress={handleStarPress}
      >
        {isSubscribed ? (
          <FontAwesome
            name="star"
            size={26}
            color="#016531"
            style={styles.likeIconStyle}
          />
        ) : (
          <FontAwesome name="star-o" size={26} color="#016531" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 2,
    marginRight: 2,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
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
    width: 70,
    height: 70,
    borderRadius: 5,
    overflow: "hidden",
    marginRight: 15,
  },
  image: {
    flex: 1,
    resizeMode: "contain",
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
    textShadowColor: "grey",
    textShadowRadius: 2,
  },
});
