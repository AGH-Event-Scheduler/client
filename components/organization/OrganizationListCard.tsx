import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

interface RoundedCardProps {
  imageSource: { uri: string };
  text: string;
  isLiked: boolean;
  onPress: () => void;
  style?: any;
}

export const OrganizationListCard = ({
  imageSource,
  text,
  isLiked,
  onPress,
  style,
}: RoundedCardProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.likeIconContainer}>
        {isLiked ? (
          <Text style={[styles.likeIcon, styles.likeIconLiked]}>★</Text>
        ) : (
          <Text style={styles.likeIcon}>☆</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
    borderRadius: 13,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
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
    fontFamily: "Montserrat-Medium",
    fontSize: 17,
    fontWeight: "500",
    flexWrap: "wrap",
  },
  likeIconContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 15,
  },
  likeIcon: {
    fontSize: 27,
    textShadowColor: "grey",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 2,
  },
  likeIconLiked: {
    color: "yellow",
    textShadowColor: "grey",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },
});
