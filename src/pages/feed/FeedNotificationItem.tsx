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

export const FeedNotificationItem = ({
  item,
  navigation,
}: {
  item: FeedNotification;
  navigation: any;
}) => {
  const { t } = useTranslation();

  const FeedNotificationTypeToMessageTemplateMap = new Map<
    FeedNotificationType,
    string
  >([
    [
      FeedNotificationType.EVENT_CREATE,
      t("feed.message-templates.event-create"),
    ],
    [
      FeedNotificationType.EVENT_UPDATE,
      t("feed.message-templates.event-update"),
    ],
    [
      FeedNotificationType.EVENT_CANCEL,
      t("feed.message-templates.event-cancel"),
    ],
    [
      FeedNotificationType.EVENT_REACTIVATE,
      t("feed.message-templates.event-reactivate"),
    ],
    [
      FeedNotificationType.ORGANIZATION_CREATE,
      t("feed.message-templates.organization-create"),
    ],
    [
      FeedNotificationType.ORGANIZATION_UPDATE,
      t("feed.message-templates.organization-update"),
    ],
  ]);

  const FeedNotificationTypeToMarkTypeMap = new Map<
    FeedNotificationType,
    MarkType
  >([
    [FeedNotificationType.EVENT_CREATE, MarkType.CREATE],
    [FeedNotificationType.EVENT_UPDATE, MarkType.EDIT],
    [FeedNotificationType.EVENT_CANCEL, MarkType.CANCEL],
    [FeedNotificationType.EVENT_REACTIVATE, MarkType.REACTIVATE],
    [FeedNotificationType.ORGANIZATION_CREATE, MarkType.CREATE],
    [FeedNotificationType.ORGANIZATION_UPDATE, MarkType.EDIT],
  ]);

  const handleCardPress = (notification: FeedNotification) => {
    console.log(`Clicked card: ${notification.type}`);

    if (!notification.seen) {
      markNotificationAsSeen(notification.id)
        .then(() => {
          console.log("Successfully marked notification as seen");
        })
        .catch(() => {
          console.log("Error while marking notification as seen");
        });
    }

    if (notification.regardingEventDTO) {
      navigation.navigate("Event", {
        eventId: notification.regardingEventDTO.id,
      });
    } else if (notification.regardingOrganizationDto) {
      navigation.navigate("Organization", {
        organizationId: notification.regardingOrganizationDto.id,
      });
    }
  };

  const image = item.regardingEventDTO
    ? item.regardingEventDTO.underOrganization.logoImage
    : item.regardingOrganizationDto.logoImage;
  const messageTemplate = FeedNotificationTypeToMessageTemplateMap.has(
    item.type,
  )
    ? FeedNotificationTypeToMessageTemplateMap.get(item.type)
    : t("feed.message-templates.default");
  const organization = item.regardingOrganizationDto
    ? item.regardingOrganizationDto
    : item.regardingEventDTO.underOrganization;
  const event = item.regardingEventDTO;

  return (
    <FeedNotificationListCard
      id={item.id}
      image={image}
      messageTemplate={messageTemplate}
      seen={item.seen}
      organization={organization}
      event={event}
      onCardPress={() => handleCardPress(item)}
      style={styles.card}
      creationTime={new Date(item.creationDate)}
      markType={FeedNotificationTypeToMarkTypeMap.get(item.type)}
    />
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
