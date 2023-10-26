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

export const CalendarScreen = () => {
  const [selectedWeek, setSelectedWeek] = useState<DateRange>();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [agendaItems, setAgendaItems] = useState<EventsByDates>();
  const childWeeklyCalendarRef = useRef(null);
  const childDateSectionListRef = useRef(null);

  const navigation = useNavigation();

  useEffect(() => {
    if (selectedWeek) {
      fetchAgendaItemsInDateRange({
        startDate: selectedWeek.startDate,
        endDate: selectedWeek.endDate,
      });
    }
  }, [selectedWeek]);

  useEffect(() => {
    if (selectedDate && !isLoading) {
      childDateSectionListRef.current?.scrollTo(selectedDate);
    }
  }, [selectedDate, isLoading]);

  const fetchAgendaItemsInDateRange = useCallback(
    async ({ startDate, endDate }: DateRange) => {
      setIsLoading(true);

      const eventsByDate = await fetchEventsInDateRange(startDate, endDate);

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

      childWeeklyCalendarRef.current?.updateMarkedDays(
        Object.keys(eventsByDate),
      );

      setIsLoading(false);
    },
    [],
  );

  const onDayChange = (date: Date) => {
    setSelectedDate(date);
  };

  const onWeekChange = (dateRange: DateRange) => {
    if (
      !selectedWeek ||
      (!isTheSameDay(dateRange.startDate, selectedWeek.startDate) &&
        !isTheSameDay(dateRange.endDate, selectedWeek.endDate))
    ) {
      setSelectedWeek(dateRange);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <SearchBar
          style={{ marginTop: 10 }}
          notEditable
          onPress={() => {
            navigation.dispatch(CommonActions.navigate("Event Search"));
          }}
        />
      </View>
      <WeeklyCalendar
        ref={childWeeklyCalendarRef}
        selectedDate={new Date()}
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
