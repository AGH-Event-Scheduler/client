import React, { memo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome, AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { EventHubImage } from "../../components/EventHubImage";
import { Image, Organization, OrganizationEvent } from "../../api/types";
import moment from "moment";
import "moment/locale/pl";
import { useTranslation } from "react-i18next";

export enum MarkType {
  CREATE,
  EDIT,
  CANCEL,
  REACTIVATE,
  REMINDER,
}

export const FeedNotificationListCardMark = memo(
  ({ markType }: { markType: MarkType }) => {
    const getMarkColor = () => {
      switch (markType) {
        case MarkType.REACTIVATE: {
        }
        case MarkType.CREATE: {
          return "#016531";
        }
        case MarkType.EDIT: {
        }
        case MarkType.CANCEL: {
          return "#BC022C";
        }
        case MarkType.REMINDER: {
          return "#000000";
        }
        default: {
          return "#000000";
        }
      }
    };

    const getMarkIcon = () => {
      switch (markType) {
        case MarkType.REACTIVATE: {
          return <Feather name="refresh-ccw" size={18} color="white" />;
        }
        case MarkType.CREATE: {
          return <FontAwesome name="star" size={18} color="white" />;
        }
        case MarkType.EDIT: {
          return <FontAwesome name="pencil" size={18} color="white" />;
        }
        case MarkType.CANCEL: {
          return <Entypo name="cross" size={18} color="white" />;
        }
        case MarkType.REMINDER: {
          return <FontAwesome name="bell" size={18} color="white" />;
        }
        default: {
          return <AntDesign name="question" size={18} color="white" />;
        }
      }
    };

    return (
      <View style={[styles.mark, { backgroundColor: getMarkColor() }]}>
        {getMarkIcon()}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  mark: {
    position: "absolute",
    backgroundColor: "#096233",
    borderRadius: 100,
    padding: 6,
    right: -5,
    bottom: -5,
  },
});
