import React, { useCallback } from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { OrganizationEvent } from "../../api/types";
import {
  toBeautifiedDateTimeString,
  toBeautifiedTimeString,
} from "../../utils/date";
import { CommonActions, useNavigation } from "@react-navigation/native";

export interface DateSectionListItem extends OrganizationEvent {
  displayFullDates: boolean;
}

interface DateSectionListCardProps {
  item: DateSectionListItem;
}

const EventDateSectionListCard = (props: DateSectionListCardProps) => {
  const { item } = props;
  const navigation = useNavigation();

  const itemPressed = useCallback(() => {
    navigation.dispatch(CommonActions.navigate("Event", { eventId: item.id }));
  }, []);

  const getDate = (date: Date, displayFullDates: boolean) => {
    if (displayFullDates) {
      return toBeautifiedDateTimeString(date);
    }
    return toBeautifiedTimeString(date);
  };

  return (
    <TouchableOpacity
      key={item.id}
      style={[styles.mainWrapper]}
      onPress={itemPressed}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.organization.logoImage.smallUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={[styles.container]}>
        <Text style={[styles.eventName]}>{item.name}</Text>
        <Text style={[styles.datetime]}>
          {getDate(new Date(item.startDate), item.displayFullDates)} -{" "}
          {getDate(new Date(item.endDate), item.displayFullDates)}
        </Text>
        <Text style={[styles.location]}>{item.location}</Text>
        <Text style={[styles.organizationName]}>{item.organization.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EventDateSectionListCard;

const styles = StyleSheet.create({
  mainWrapper: {
    marginVertical: 3,
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
    gap: 5,
  },
  container: {
    flexDirection: "column",
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 100,
    overflow: "hidden",
    marginRight: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  eventName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "black",
  },
  organizationName: {
    color: "black",
    fontSize: 12,
    fontWeight: "bold",
  },
  datetime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#016531",
  },
  location: {
    fontSize: 13,
    color: "black",
    fontWeight: "bold",
  },
});