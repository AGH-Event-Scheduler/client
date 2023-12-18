import React, { useEffect, useState } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import {
  FeedNotification,
  FeedNotificationType,
  Organization,
  Page,
} from "../../api/types";
import {
  fetchAllOrganizationsWithStatusByUser,
  subscribeToOrganization,
  unsubscribeFromOrganization,
} from "../../api/organization-api-utils";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../../components/SearchBar";
import { LoadingView } from "../../components/loading/LoadingView";
import { AppCheckButton } from "../../components/AppCheckButton";
import { getFeed, markNotificationAsSeen } from "../../api/feed-api-utils";
import { FeedNotificationListCard } from "./FeedNotificationListCard";
import { MarkType } from "./FeedNotificationListCardMark";
import { FeedNotificationItem } from "./FeedNotificationItem";
import { AppToggleButton } from "../../components/AppToggleButton";
import { PaginationFooter } from "../../components/PaginationFooter";

enum FeedFilter {
  ALL,
  NOT_SEEN,
}

interface ToggleButtonItem {
  key: FeedFilter;
  title: string;
}

export const FeedScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const toggleButtonItems: ToggleButtonItem[] = [
    { key: FeedFilter.ALL, title: t("feed.all") },
    { key: FeedFilter.NOT_SEEN, title: t("feed.not-seen") },
  ];

  const [notifications, setNotifications] = useState<FeedNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedFilterItem, setFeedFilterItem] = useState<ToggleButtonItem>(
    toggleButtonItems[0],
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchOrganizationsData = async () => {
      setIsLoading(true);
      try {
        const feedNotificationsPage: Page<FeedNotification> = await getFeed(
          feedFilterItem.key === FeedFilter.NOT_SEEN,
          currentPage,
        );
        setTotalPages(feedNotificationsPage.totalPages);
        setNotifications(feedNotificationsPage.content);
      } catch (error) {
        console.log("Fetching feed error", error);
      }
      setIsLoading(false);
    };
    isFocused && fetchOrganizationsData();
  }, [feedFilterItem, isFocused, currentPage]);

  const handleFilterButtonPress = (filter: ToggleButtonItem) => {
    setFeedFilterItem(filter);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.navigationContainer]}>
        <AppToggleButton
          items={toggleButtonItems}
          currentSelection={feedFilterItem}
          onSelect={handleFilterButtonPress}
          size="default"
          gap={10}
        />
      </View>
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id?.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            return <FeedNotificationItem item={item} navigation={navigation} />;
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            <PaginationFooter
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
  },
  listContainer: {
    flexGrow: 1,
  },
  card: {
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 5,
  },
  navigationContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 10,
    marginTop: 10,
  },
});
