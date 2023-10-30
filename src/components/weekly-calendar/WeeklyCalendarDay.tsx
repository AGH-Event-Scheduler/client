import React, { Component, useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  toDayDateString,
  toDayShortcut,
  toSimpleDateString,
} from "../../utils/date";
import { isTheSameDay } from "./utils/date-ranges";
import { useTranslation } from "react-i18next";

interface WeeklyCalendarDayProps {
  marked: boolean;
  day: Date;
  selected: boolean;
  onPress?: () => void;
}

export const WeeklyCalendarDay = (props: WeeklyCalendarDayProps) => {
  const { t, i18n } = useTranslation();

  const getDayLabel = (day: Date) => {
    return toDayShortcut(day, i18n.language);
  };

  const getDay = (day: Date) => {
    return toDayDateString(day, i18n.language);
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={props.onPress}>
      <Text style={styles.dayLabel}>{getDayLabel(props.day)}</Text>
      <View
        style={[
          styles.roundContainer,
          props.selected
            ? styles.selectedRoundContainerColor
            : isTheSameDay(new Date(), props.day)
            ? styles.defaultTodayRoundContainerColor
            : styles.defaultRoundContainerColor,
        ]}
      >
        {props.marked ? (
          <View
            style={[
              styles.mark,
              props.selected
                ? styles.selectedMarkColor
                : styles.defaultMarkColor,
            ]}
          ></View>
        ) : null}
        <Text
          style={[
            styles.day,
            props.selected ? styles.selectedDayColor : styles.defaultDayColor,
          ]}
        >
          {getDay(props.day)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  roundContainer: {
    width: 35,
    height: 35,
    borderRadius: 100,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  mark: {
    width: 6,
    height: 6,
    borderRadius: 100,
    position: "absolute",
    top: 3.5,
  },
  dayLabel: {
    fontWeight: "bold",
    color: "#016531",
  },
  day: {
    fontWeight: "bold",
  },
  selectedMarkColor: {
    backgroundColor: "white",
  },
  defaultMarkColor: {
    backgroundColor: "#016531",
  },
  selectedRoundContainerColor: {
    backgroundColor: "#016531",
  },
  defaultRoundContainerColor: {
    backgroundColor: "#F5F9F7",
  },
  defaultTodayRoundContainerColor: {
    backgroundColor: "#B1EBCC",
  },
  selectedDayColor: {
    color: "white",
  },
  defaultDayColor: {
    color: "#016531",
  },
});
