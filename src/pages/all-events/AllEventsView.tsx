import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { EventOrganizationListCard } from "../organization-details/EventOrganizationListCard";
import { OrganizationEvent } from "../../api/types";
import { useIsFocused } from "@react-navigation/native";
import { fetchOrganizationEvents } from "../../api/event-api-utils";
import { AppToggleButton } from "../../components/AppToggleButton";
import { LoadingView } from "../../components/loading/LoadingView";
import { SearchBar } from "../../components/SearchBar";
import { PaginationFooter } from "../../components/PaginationFooter";

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
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const organizationId = route.params.organizationId;

  useEffect(() => {
    const loadOrganizationEvents = async () => {
      setIsLoading(true);
      try {
        const eventsPage = await fetchOrganizationEvents(
          organizationId,
          eventsType.key,
          currentPage,
          10,
          searchQuery,
        );
        setTotalPages(eventsPage.totalPages);
        setEvents(eventsPage.content);
      } catch (error) {
        console.log("Fetching organization details error", error);
      }
      setIsLoading(false);
    };
    isFocused && loadOrganizationEvents();
  }, [isFocused, eventsType, searchQuery, currentPage]);

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
          gap={5}
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
              canceled={item?.canceled}
              style={styles.card}
            />
          )}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={styles.listContainer}
          ListFooterComponent={
            <PaginationFooter
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
            />
          }
        />
      )}
      {events.length === 0 ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Text>{t("all-events.no-events")}</Text>
        </View>
      ) : null}
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
