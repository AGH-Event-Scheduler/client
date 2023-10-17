import React, { useCallback, useEffect, useState } from "react";
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  Agenda,
  DateData,
} from "react-native-calendars";
import AgendaItem, { AgendaListItem } from "./AgendaItem";
import { formatDate } from "../../utils/date";
import { useIsFocused } from "@react-navigation/native";
import { fetchEventsInDateRange } from "../../api/event-api-utils";
import { ActivityIndicator } from "react-native";
import { LoadingView } from "../../components/loading/LoadingView";
import { UpdateSources } from "react-native-calendars/src/expandableCalendar/commons";
import { OrganizationEvent } from "../../api/types";

const getFirstDayOfTheWeek = (date: Date = new Date()) => {
  const first = new Date();
  first.setHours(0, 0, 0, 0);
  first.setDate(date.getDate() - date.getDay() + 1);
  return first;
};

const getLastDayOfTheWeek = (date: Date = new Date()) => {
  const last = new Date();
  last.setHours(0, 0, 0, 0);
  last.setDate(date.getDate() - date.getDay() + 7);
  return last;
};

const getNextDay = (date: Date) => {
  const next = new Date();
  next.setHours(0, 0, 0, 0);
  next.setDate(date.getDate() + 1);
  return next;
};

const getDatesInRange = (startDate: Date, endDate: Date) => {
  if (formatDate(startDate) > formatDate(endDate)) {
    const tmp = startDate;
    startDate = endDate;
    endDate = tmp;
  }

  var result = [startDate];
  while (formatDate(startDate) != formatDate(endDate)) {
    startDate = getNextDay(startDate);
    result.push(startDate);
  }

  return result;
};

interface DateRange {
  startDate: Date;
  endDate: Date;
}

export const CalendarScreen = () => {
  const renderItem = useCallback(({ item }: any) => {
    console.log("rendering...");
    return <AgendaItem item={item} />;
  }, []);

  const [dateRange, setDateRange] = useState<DateRange>();
  const [isLoading, setIsLoading] = useState(true);
  const [agendaItems, setAgendaItems] = useState<
    { key: string; title: string; data: AgendaListItem[] }[]
  >([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    isFocused &&
      setDateRange({
        startDate: getFirstDayOfTheWeek(),
        endDate: getLastDayOfTheWeek(),
      });
  }, [isFocused]);

  useEffect(() => {
    if (dateRange) {
      fetchAgendaItemsInDateRange({
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });
    }
  }, [dateRange]);

  const onDateChanged = (date: string, updateSource: UpdateSources) => {
    const newDate = new Date(date);
    // console.log(`Date: ${date}, updatedSource: ${updateSource}, CalcFirstDate: ${getFirstDayOfTheWeek(newDate)}, CurrFirstDate: ${dateRange.startDate}, Comp: ${getFirstDayOfTheWeek(newDate).toISOString() == dateRange.startDate.toISOString()}`); // TODO: WHY ALWAYS FALSE??
    if (
      updateSource === UpdateSources.WEEK_SCROLL ||
      (updateSource === UpdateSources.TODAY_PRESS &&
        getFirstDayOfTheWeek(newDate).toISOString() !=
          dateRange.startDate.toISOString())
    ) {
      setDateRange({
        startDate: getFirstDayOfTheWeek(newDate),
        endDate: getLastDayOfTheWeek(newDate),
      });
      // console.log("Set new date");
    }
  };

  const fetchAgendaItemsInDateRange = useCallback(
    async ({ startDate, endDate }: DateRange) => {
      setIsLoading(true);
      const eventsByDate = await fetchEventsInDateRange(startDate, endDate);

      const toAgendaListItem = (event: OrganizationEvent): AgendaListItem => {
        return {
          ...event,
          displayFullDates:
            formatDate(new Date(event.startDate)) !==
            formatDate(new Date(event.endDate)),
        };
      };

      const result = getDatesInRange(startDate, endDate).map((date) => {
        const dateString = formatDate(date);
        if (eventsByDate.hasOwnProperty(dateString)) {
          const events: OrganizationEvent[] = eventsByDate[dateString];
          return {
            title: dateString,
            key: dateString,
            data: events.map(toAgendaListItem),
          };
        }
        return {
          title: dateString,
          key: dateString,
          data: [],
        };
      });

      // const result = {}
      // getDatesInRange(startDate, endDate).forEach(date => {
      //   const dateString = formatDate(date)
      //   if (eventsByDate.hasOwnProperty(dateString)){
      //     const events: OrganizationEvent[] = eventsByDate[dateString];
      //     result[dateString] = events.map(toAgendaListItem)
      //   } else {
      //     result[dateString] = []
      //   }

      // });

      setAgendaItems(result);
      console.log(Object.keys(result));

      setIsLoading(false);
    },
    [],
  );

  return (
    <CalendarProvider // change this to something different. On week change it selects new date which does not trigger on press, shole whing is lagging as fuck
      date={formatDate()}
      showTodayButton
      // onDateChanged={onDateChanged}  // maybe this instead will fix it
    >
      <ExpandableCalendar
        firstDay={1}
        // futureScrollRange={1}
        // pastScrollRange={1}
        // onEndReached={() => {}}
        // ={() => {}}
      />
      {isLoading ? (
        <LoadingView />
      ) : (
        <AgendaList
          // sections={[{title: '2023-10-17', data: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},]},{title: '2023-10-18', data: [{},{},{},{},{},{},{},{},{},{},]}]}
          sections={agendaItems}
          renderItem={renderItem}
        />
      )}
    </CalendarProvider>
    // <Agenda
    //   items={agendaItems}
    //   renderItem={(item, firstItemInDay) => {
    //     return renderItem(item);
    //   }}
    //   firstDay={1}
    //   renderEmptyData={() =>{return <LoadingView />}}
    // />
  );
};
