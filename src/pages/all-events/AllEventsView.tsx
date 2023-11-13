import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TextInput, FlatList } from "react-native";
import { EventOrganizationListCard } from "../organization-details/EventOrganizationListCard";
import { OrganizationEvent } from "../../api/types";
import { useIsFocused } from "@react-navigation/native";
import { fetchOrganizationEvents } from "../../api/event-api-utils";
import { AppToggleButton } from "../../components/AppToggleButton";
import { LoadingView } from "../../components/loading/LoadingView";
import { SearchBar } from "../../components/SearchBar";

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
  const [events, setEvents] = useState<OrganizationEvent[]>([]);
  const [eventsType, setEventsType] = useState<ToggleButtonItem>(
    toggleButtonItems[0],
  );
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const organizationId = route.params.organizationId;

  useEffect(() => {
    const loadOrganizationEvents = async () => {
      setIsLoading(true);
      try {
        const events = await fetchOrganizationEvents(
          organizationId,
          eventsType.key,
          searchQuery,
        );
        setEvents(events);
      } catch (error) {
        console.log("Fetching organization details error", error);
      }
      setIsLoading(false);
    };
    isFocused && loadOrganizationEvents();
  }, [isFocused, eventsType, searchQuery]);

  const handleCardPress = (event: OrganizationEvent) => {
    navigation.navigate("Event", { eventId: event.id });
  };

  const handleNavButtonPress = (view: ToggleButtonItem) => {
    setEventsType(view);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <AppToggleButton
          items={toggleButtonItems}
          currentSelection={eventsType}
          onSelect={(item) => handleNavButtonPress(item)}
          size="default"
        />
      </View>
      <SearchBar
        onSearchChange={(searchTerm: string) => {
          setSearchQuery(searchTerm);
        }}
        style={{ marginTop: 10 }}
      />
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id?.toString()}
          renderItem={({ item }) => (
            <EventOrganizationListCard
              image={item?.backgroundImage}
              name={item.nameTranslated}
              location={item.locationTranslated}
              onCardPress={() => handleCardPress(item)}
              startDate={new Date(item.startDate)}
              style={styles.card}
            />
          )}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContainer}
        />
      )}
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
    alignItems: "center",
  },
  card: {
    marginBottom: 16,
    width: 300,
    height: 200,
  },
  navigationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    marginTop: 10,
  },
});
