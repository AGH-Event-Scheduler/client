import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import { EventOrganizationListCard } from "../organization-details/EventOrganizationListCard";
import { Event } from "../../api/types";
import { useIsFocused } from "@react-navigation/native";
import { fetchOrganizationEvents } from "../../api/event-api-utils";
import { AppToggleButton } from "../../components/AppToggleButton";

export enum AllEventsViewTypeOption {
  Upcoming = "UPCOMING",
  Past = "PAST",
}

interface ToggleButtonItem {
  key: AllEventsViewTypeOption;
  title: string;
}

export const AllEventsView = ({ navigation, route }) => {
  const { t } = useTranslation();
  const toggleButtonItems: ToggleButtonItem[] = [
    { key: AllEventsViewTypeOption.Upcoming, title: t("all-events.upcoming") },
    { key: AllEventsViewTypeOption.Past, title: t("all-events.past") },
  ];
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsType, setEventsType] = useState<ToggleButtonItem>(
    toggleButtonItems[0],
  );
  const isFocused = useIsFocused();

  const organizationId = route.params.organizationId;

  useEffect(() => {
    const loadOrganizationEvents = async () => {
      try {
        const events = await fetchOrganizationEvents(
          organizationId,
          eventsType.key,
        );
        setEvents(events);
      } catch (error) {
        console.log("Fetching organization details error", error);
      }
    };
    isFocused && loadOrganizationEvents();
  }, [isFocused, eventsType]);

  const handleCardPress = (event: Event) => {
    navigation.navigate("Event", { eventId: event.id });
  };

  const handleNavButtonPress = (view: ToggleButtonItem) => {
    setEventsType(view);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t("general.all-events")}</Text>
      <View style={styles.navigationContainer}>
        <AppToggleButton
          items={toggleButtonItems}
          currentSelection={eventsType}
          onSelect={(item) => handleNavButtonPress(item)}
          size="default"
        />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder={`${t("general.search")}...`}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={({ item }) => (
          <EventOrganizationListCard
            imageSource={{ uri: item?.backgroundImage.mediumUrl }}
            name={item.name}
            location={item.location}
            onCardPress={() => handleCardPress(item)}
            startDate={new Date(item.startDate)}
            style={styles.card}
          />
        )}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#B0BCC4",
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 16,
  },
  navigationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
  },
});
