import React, { Component, useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { WeeklyCalendarDay } from "./WeeklyCalendarDay";
import {
  DateRange,
  getDatesInRange,
  getFirstAndLastDayOfWeek,
  getNextDay,
  getPreviousDay,
  isInDateRange,
  isTheSameDay,
} from "./utils/date-ranges";
import { toMonthName, toSimpleDateString } from "../../utils/date";
import { AntDesign } from "@expo/vector-icons";

interface WeeklyCalendarProps {
  style?;

  onDayChange?: (newSelectedDate: Date, previousSelectedDate: Date) => void;
  onWeekChange?: (
    newDateRange: DateRange,
    previousDateRande: DateRange,
  ) => void;

  getMarkedDates?: (dateRange: DateRange) => Date[];

  selectedDate: Date;
}

export const WeeklyCalendar = (props: WeeklyCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(props.selectedDate);
  const [selectedWeek, setSelectedWeek] = useState<DateRange>(
    getFirstAndLastDayOfWeek(props.selectedDate),
  );
  const [markedDates, setMarkedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const changeDate = (newDate: Date) => {
    const previousDate = selectedDate;

    setSelectedDate(newDate);
    if (props.onDayChange) {
      props.onDayChange(newDate, previousDate);
    }

    if (
      !isTheSameDay(
        getFirstAndLastDayOfWeek(previousDate).startDate,
        getFirstAndLastDayOfWeek(newDate).startDate,
      )
    ) {
      const previousWeek = selectedWeek;
      const newWeek = getFirstAndLastDayOfWeek(newDate);
      if (props.onWeekChange) {
        props.onWeekChange(newWeek, previousWeek);
      }
      setSelectedWeek(newWeek);
    }
  };

  useEffect(() => {
    if (props.getMarkedDates) {
      setIsLoading(true);
      setMarkedDates(props.getMarkedDates(selectedWeek));
    }
    setIsLoading(false);
  }, [selectedWeek]);

  const handleLeftClick = () => {
    var previousWeek = getFirstAndLastDayOfWeek(
      getPreviousDay(selectedWeek.startDate),
    );
    if (isInDateRange(new Date(), previousWeek)) {
      changeDate(new Date());
    } else {
      changeDate(previousWeek.startDate);
    }
  };

  const handleRightClick = () => {
    var nextWeek = getFirstAndLastDayOfWeek(getNextDay(selectedWeek.endDate));
    if (isInDateRange(new Date(), nextWeek)) {
      changeDate(new Date());
    } else {
      changeDate(nextWeek.startDate);
    }
  };

  const handleDayClick = (day: Date) => {
    changeDate(day);
  };

  const renderWeeklyCalendarDay = useCallback(
    (selected: boolean, marked: boolean, day: Date) => {
      return (
        <WeeklyCalendarDay
          key={toSimpleDateString(day)}
          selected={selected}
          marked={marked}
          day={day}
          onPress={() => handleDayClick(day)}
        />
      );
    },
    [],
  );

  return (
    <View style={[styles.wrapper, props.style]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{toMonthName(selectedDate)}</Text>
        {isLoading ? <ActivityIndicator size={"small"} /> : null}
      </View>
      <View style={[styles.container]}>
        <TouchableOpacity onPress={handleLeftClick}>
          <AntDesign name="left" size={24} color="#016531" />
        </TouchableOpacity>
        <View style={styles.daysContainer}>
          {getDatesInRange(selectedWeek.startDate, selectedWeek.endDate).map(
            (date: Date) => {
              return renderWeeklyCalendarDay(
                isTheSameDay(date, selectedDate),
                markedDates.includes(date),
                date,
              );
            },
          )}
        </View>
        <TouchableOpacity onPress={handleRightClick}>
          <AntDesign name="right" size={24} color="#016531" />
        </TouchableOpacity>
      </View>
      {/* {!isInDateRange(new Date(), selectedWeek) ? (
                    <TouchableOpacity onPress={() => changeDate(new Date())} style={[styles.todayButtonWrapper]}>
                        <Text style={styles.todayButtonText}>TODAY</Text>
                        <AntDesign name="upcircle" size={18} style={styles.todayButtonText} />
                    </TouchableOpacity>
                ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    gap: 4,
  },
  container: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  header: {
    flexDirection: "row",
    gap: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
  },
  daysContainer: {
    flex: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 10,
  },
  todayButtonWrapper: {
    position: "absolute",
    left: 10,
    bottom: 1,
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
