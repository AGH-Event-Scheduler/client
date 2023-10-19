import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { toSimpleDateString } from "../../utils/date";
import { useIsFocused } from "@react-navigation/native";
import { fetchEventsInDateRange } from "../../api/event-api-utils";
import { OrganizationEvent } from "../../api/types";
import { DateSectionList, SectionType } from "./DateSectionList";
import { DateSectionListItem } from "./DateSectionListItem";
import WeeklyCalendar from "./WeeklyCalendar";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  DateRange,
  getDatesInRange,
  isInDateRange,
  isTheSameDay,
} from "./utils/date-ranges";
import { AntDesign } from "@expo/vector-icons";

export const CalendarScreen = () => {
  const [selectedWeek, setSelectedWeek] = useState<DateRange>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(true);
  const [agendaItems, setAgendaItems] = useState<SectionType>();
  const childWeeklyCalendarRef = useRef(null);

  const isFocused = useIsFocused();
  useEffect(() => {
    // isFocused &&
    // setDateRange(getFirstAndLastDayOfWeek());
  }, [isFocused]);

  useEffect(() => {
    // if (dateRange) {
    //   fetchAgendaItemsInDateRange({
    //     startDate: dateRange.startDate,
    //     endDate: dateRange.endDate,
    //   });
    // }
  }, [selectedWeek]);

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

      const results: SectionType = {};
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
      // console.log(Object.keys(results));

      setIsLoading(false);
    },
    [],
  );

  const onDayChange = (date: Date) => {
    setSelectedDate(date);
  };

  const onWeekChange = (dateRange: DateRange) => {
    setSelectedWeek(dateRange);
  };

  return (
    <View style={styles.wrapper}>
      <WeeklyCalendar
        ref={childWeeklyCalendarRef}
        selectedDate={new Date()}
        onDayChange={onDayChange}
        onWeekChange={onWeekChange}
      />
      <DateSectionList sections={agendaItems} />
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
  },
  todayButtonWrapper: {
    position: "absolute",
    left: 10,
    bottom: 30,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderColor: "#016531",
    borderWidth: 2,
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
