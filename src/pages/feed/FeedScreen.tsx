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
import { getFeed } from "../../api/feed-api-utils";
import { FeedNotificationListCard } from "./FeedNotificationListCard";

enum FeedFilter {
  ALL,
  NOT_SEEN,
}

export const FeedScreen = ({ navigation }) => {
  const { t } = useTranslation();

  const FeedNotificationTypeToMessageTemplateMap = new Map<
    FeedNotificationType,
    string
  >([
    [
      FeedNotificationType.EVENT_CREATE,
      'Organization {organization.name} has created an event {event.name} with description "{event.description}"',
    ],
    [FeedNotificationType.EVENT_UPDATE, t("")],
    [FeedNotificationType.EVENT_CANCEL, t("")],
    [FeedNotificationType.EVENT_REENABLE, t("")],
    [FeedNotificationType.ORGANIZATION_CREATE, t("")],
    [FeedNotificationType.ORGANIZATION_UPDATE, t("")],
  ]);

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
  }, [isFocused, feedFilter]);

  const handleCardPress = (notification: FeedNotification) => {
    console.log(`Clicked card: ${notification.type}`);

    // Navigate based on existance of regardingEvent / regarding Organization or type
    // navigation.navigate("Organization", { organizationId: organization.id });
  };

  const renderFeedNotificationItem = ({
    item,
    index,
  }: {
    item: FeedNotification;
    index: number;
  }) => {
    const image = item.regardingEventDTO
      ? item.regardingEventDTO.underOrganization.logoImage
      : item.regardingOrganizationDto.logoImage;
    const messageTemplate = FeedNotificationTypeToMessageTemplateMap.has(
      item.type,
    )
      ? FeedNotificationTypeToMessageTemplateMap.get(item.type)
      : t("");
    const organization = item.regardingOrganizationDto
      ? item.regardingOrganizationDto
      : item.regardingEventDTO.underOrganization;
    const event = item.regardingEventDTO;

    return (
      <FeedNotificationListCard
        key={index}
        image={image}
        messageTemplate={messageTemplate}
        seen={item.seen}
        organization={organization}
        event={event}
        onCardPress={() => handleCardPress(item)}
        style={styles.card}
        creationTime={new Date(item.creationDate)}
      />
    );
  };

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
          renderItem={renderFeedNotificationItem}
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
