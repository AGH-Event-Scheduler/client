import React, { useCallback, useEffect, useRef, useState } from "react";
import { toSimpleDateString } from "../../utils/date";
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { fetchEventsInDateRange } from "../../api/event-api-utils";
import { OrganizationEvent } from "../../api/types";
import EventDateSectionList, {
  EventsByDates,
} from "../../components/event-date-section-list/EventDateSectionList";
import { DateSectionListItem } from "../../components/event-date-section-list/EventDateSectionListCard";
import WeeklyCalendar from "../../components/weekly-calendar/WeeklyCalendar";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DateRange,
  getDatesInRange,
  getFirstAndLastDayOfWeek,
  isInDateRange,
  isTheSameDay,
} from "../../components/weekly-calendar/utils/date-ranges";
import { AntDesign } from "@expo/vector-icons";
import { LoadingView } from "../../components/loading/LoadingView";
import { SearchBar } from "../../components/SearchBar";
import { AppCheckButton } from "../../components/AppCheckButton";
import { useTranslation } from "react-i18next";
import { AppToggleButton } from "../../components/AppToggleButton";

enum EventFilter {
  SAVED,
  FOLLOWING,
  ALL,
}

interface ToggleButtonItem {
  key: EventFilter;
  title: string;
}

export const CalendarScreen = () => {
  const { t } = useTranslation();
  const toggleButtonItems: ToggleButtonItem[] = [
    { key: EventFilter.ALL, title: t("calendar.all") },
    { key: EventFilter.FOLLOWING, title: t("calendar.following") },
    { key: EventFilter.SAVED, title: t("calendar.saved") },
  ];

  const dateNow = new Date();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWeek, setSelectedWeek] = useState<DateRange>(
    getFirstAndLastDayOfWeek(dateNow),
  );
  const [selectedDate, setSelectedDate] = useState<Date>(dateNow);
  const [eventsFilterItem, setEventsFilterItem] = useState<ToggleButtonItem>(
    toggleButtonItems[0],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [agendaItems, setAgendaItems] = useState<EventsByDates>();
  const childWeeklyCalendarRef = useRef(null);
  const childDateSectionListRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    fetchAgendaItemsInSelectedWeek();
  }, [selectedWeek, eventsFilterItem, searchQuery]);

  useEffect(() => {
    if (!isLoading) {
      childDateSectionListRef.current?.scrollTo(selectedDate);
    }
  }, [selectedDate]);

  const fetchAgendaItemsInSelectedWeek = useCallback(async () => {
    const { startDate, endDate } = selectedWeek;
    setIsLoading(true);

    var eventsByDate: { [date: string]: OrganizationEvent[] };
    if (eventsFilterItem.key === EventFilter.SAVED) {
      eventsByDate = await fetchEventsInDateRange(
        startDate,
        endDate,
        searchQuery,
        true,
      );
    } else if (eventsFilterItem.key === EventFilter.FOLLOWING) {
      eventsByDate = await fetchEventsInDateRange(
        startDate,
        endDate,
        searchQuery,
        false,
        true,
      );
    } else {
      eventsByDate = await fetchEventsInDateRange(
        startDate,
        endDate,
        searchQuery,
      );
    }

    const toAgendaListItem = (
      event: OrganizationEvent,
    ): DateSectionListItem => {
      return {
        ...event,
        displayFullDates: !isTheSameDay(
          new Date(event.startDate),
          new Date(event.endDate),
        ),
      };
    };

    const results: EventsByDates = {};
    getDatesInRange(startDate, endDate).forEach((date) => {
      const dateString = toSimpleDateString(date);
      if (eventsByDate.hasOwnProperty(dateString)) {
        const events: OrganizationEvent[] = eventsByDate[dateString];
        results[dateString] = events.map(toAgendaListItem);
      } else {
        results[dateString] = [];
      }
    });

    setAgendaItems(results);

    childWeeklyCalendarRef.current?.updateMarkedDays(Object.keys(eventsByDate));

    setIsLoading(false);
  }, [selectedWeek, eventsFilterItem, searchQuery]);

  const onDayChange = (date: Date) => {
    setSelectedDate(date);
  };

  const onWeekChange = (dateRange: DateRange) => {
    setSelectedWeek(dateRange);
  };

  const handleFilterButtonPress = (filter: ToggleButtonItem) => {
    setEventsFilterItem(filter);
  };

  return (
    <View style={styles.wrapper}>
      <AppToggleButton
        items={toggleButtonItems}
        currentSelection={eventsFilterItem}
        onSelect={handleFilterButtonPress}
        size={"small"}
      />
      <View>
        <SearchBar
          onSearchChange={(searchTerm: string) => {
            setSearchQuery(searchTerm);
          }}
          style={{ marginTop: 10 }}
        />
      </View>
      <WeeklyCalendar
        ref={childWeeklyCalendarRef}
        selectedDate={dateNow}
        onDayChange={onDayChange}
        onWeekChange={onWeekChange}
      />
      {isLoading ? (
        <LoadingView />
      ) : (
        <EventDateSectionList
          ref={childDateSectionListRef}
          sections={agendaItems}
        />
      )}
      {selectedWeek && !isInDateRange(new Date(), selectedWeek) ? (
        <TouchableOpacity
          onPress={() => childWeeklyCalendarRef.current.changeDate(new Date())}
          style={[styles.todayButtonWrapper]}
        >
          <Text style={styles.todayButtonText}>TODAY</Text>
          <AntDesign name="upcircle" size={18} style={styles.todayButtonText} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  todayButtonWrapper: {
    position: "absolute",
    left: 10,
    bottom: 30,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderColor: "#016531",
    borderWidth: 1,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: { width: -1, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  todayButtonText: {
    color: "#016531",
    fontWeight: "bold",
  },
});
