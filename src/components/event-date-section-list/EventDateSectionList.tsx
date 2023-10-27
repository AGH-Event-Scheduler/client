import EventDateSectionListCard, {
  DateSectionListItem,
} from "./EventDateSectionListCard";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import {
  toBeautifiedDateString,
  toDayOfWeekName,
  toSimpleDateString,
} from "../../utils/date";
import { useTranslation } from "react-i18next";

export interface EventsByDates {
  [date: string]: DateSectionListItem[];
}

interface EventDateSectionListProps {
  sections: EventsByDates;
}

interface SectionListItem {
  title: string;
  data: DateSectionListItem[];
}

const EventDateSectionList = (props: EventDateSectionListProps, ref) => {
  const { t, i18n } = useTranslation();

  useImperativeHandle(ref, () => ({
    scrollTo: (date: Date) => {
      scrollToDate(date);
    },
  }));

  const childSectionListRef = useRef<SectionList>(null);

  const scrollToDate = (date: Date) => {
    childSectionListRef.current.scrollToLocation({
      animated: true,
      itemIndex: 0,
      sectionIndex: Object.keys(props.sections).indexOf(
        toSimpleDateString(date),
      ),
    });
  };

  const toDateSectionListItems = (eventByDates: EventsByDates) => {
    return Object.keys(eventByDates).map((date: string) => {
      return {
        title: date,
        data: eventByDates[date],
      };
    });
  };

  const renderSectionHeader = useCallback(({ section }) => {
    const date = new Date(section.title);
    const dayMonth = toBeautifiedDateString(date, i18n.language);
    const dayOfWeek = toDayOfWeekName(date, i18n.language);
    return (
      <View key={section.title} style={[styles.headerWrapper]}>
        <Text style={[styles.header, styles.headerTop]}>{dayMonth}</Text>
        <Text style={[styles.header, styles.headerBottom]}>{dayOfWeek}</Text>
      </View>
    );
  }, []);

  const renderItem = useCallback(({ item }) => {
    return <EventDateSectionListCard key={item.id} item={item} />;
  }, []);

  const renderNoContent = ({ section }) => {
    if (section.data.length == 0) {
      return (
        <View style={[styles.noEventWrapper]}>
          <Text style={[styles.noEventText]}>{t("calendar.empty-date")}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SectionList
      ref={childSectionListRef}
      sections={toDateSectionListItems(props.sections)}
      renderSectionHeader={renderSectionHeader}
      renderItem={renderItem}
      renderSectionFooter={renderNoContent}
      onScrollToIndexFailed={() => {}}
    />
  );
};

export default forwardRef(EventDateSectionList);

const styles = StyleSheet.create({
  headerWrapper: {
    paddingVertical: 10,
  },
  header: {
    color: "#016531",
    fontWeight: "bold",
  },
  headerTop: {
    fontSize: 15,
  },
  headerBottom: {
    fontSize: 13,
  },
  noEventWrapper: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  noEventText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
});
