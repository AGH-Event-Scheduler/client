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

enum FeedFilter {
  ALL,
  NOT_SEEN,
}

export const FeedScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const [notifications, setNotifications] = useState<FeedNotification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [feedFilter, setFeedFilter] = useState<FeedFilter>(FeedFilter.ALL);

  const isFocused = useIsFocused();
  useEffect(() => {
    const fetchOrganizationsData = async () => {
      setIsLoading(true);
      try {
        const feedNotifications: FeedNotification[] = await getFeed(
          feedFilter === FeedFilter.NOT_SEEN,
        );
        setNotifications(feedNotifications);
      } catch (error) {
        console.log("Fetching feed error", error);
      }
      setIsLoading(false);
    };
    isFocused && fetchOrganizationsData();
  }, [feedFilter, isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <AppCheckButton
          onPress={() => {
            setFeedFilter(FeedFilter.ALL);
          }}
          title={t("feed.all")}
          isChecked={feedFilter === FeedFilter.ALL}
          size="small"
        />
        <AppCheckButton
          onPress={() => {
            setFeedFilter(FeedFilter.NOT_SEEN);
          }}
          title={t("feed.not-seen")}
          isChecked={feedFilter === FeedFilter.NOT_SEEN}
          size="small"
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
});
