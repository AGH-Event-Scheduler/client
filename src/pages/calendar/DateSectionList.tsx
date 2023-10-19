import { DateSectionListItem } from "./DateSectionListItem";
import React, { Component, useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export interface SectionType {
  [date: string]: DateSectionListItem[];
}

interface DateSectionListProps {
  sections: SectionType;
}

export const DateSectionList = (props: DateSectionListProps) => {
  return <View></View>;
};
