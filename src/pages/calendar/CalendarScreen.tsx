import React, { useCallback, useEffect, useState } from "react";
import { toSimpleDateString } from "../../utils/date";
import { useIsFocused } from "@react-navigation/native";
import { fetchEventsInDateRange } from "../../api/event-api-utils";
import { OrganizationEvent } from "../../api/types";
import { DateSectionList, SectionType } from "./DateSectionList";
import { DateSectionListItem } from "./DateSectionListItem";
import { WeeklyCalendar } from "./WeeklyCalendar";
import { View, Text } from "react-native";
import { DateRange, getDatesInRange } from "./utils/date-ranges";

export const CalendarScreen = () => {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [isLoading, setIsLoading] = useState(true);
  const [agendaItems, setAgendaItems] = useState<SectionType>();

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
  }, [dateRange]);

  const fetchAgendaItemsInDateRange = useCallback(
    async ({ startDate, endDate }: DateRange) => {
      setIsLoading(true);
      const eventsByDate = await fetchEventsInDateRange(startDate, endDate);

      const toAgendaListItem = (
        event: OrganizationEvent,
      ): DateSectionListItem => {
        return {
          ...event,
          displayFullDates:
            toSimpleDateString(new Date(event.startDate)) !==
            toSimpleDateString(new Date(event.endDate)),
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

  return (
    <View style={{}}>
      <WeeklyCalendar selectedDate={new Date()} />
      <DateSectionList sections={agendaItems} />
    </View>
  );
};
