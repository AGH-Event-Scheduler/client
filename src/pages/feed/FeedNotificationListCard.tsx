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
  REENABLE,
  REMINDER,
}

interface OrganizationListCardProps {
  id: number;
  image: Image;
  messageTemplate: string;
  seen: boolean;
  organization?: Organization;
  event?: OrganizationEvent;
  onCardPress: () => void;
  style?: any;
  creationTime: Date;
  markType: MarkType;
}

export const FeedNotificationListCard = memo(
  ({
    id,
    image,
    messageTemplate,
    seen,
    organization,
    event,
    onCardPress,
    style,
    creationTime,
    markType,
  }: OrganizationListCardProps) => {
    const { t, i18n } = useTranslation();

    const getMarkColor = () => {
      switch (markType) {
        case MarkType.REENABLE: {
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
        case MarkType.REENABLE: {
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

    const handleCardPress = () => {
      onCardPress();
    };

    const templateRegexPattern = /(\{.*?\})/g;

    const replaceTemplate = (templatePart: string) => {
      templatePart = templatePart.replace(
        "{organization.name}",
        organization?.name,
      );
      templatePart = templatePart.replace(
        "{organization.description}",
        organization?.description,
      );
      templatePart = templatePart.replace(
        "{event.name}",
        event?.nameTranslated,
      );
      templatePart = templatePart.replace(
        "{event.description}",
        event?.descriptionTranslated,
      );
      return templatePart;
    };

    const toMessagePart = (templatePart: string) => {
      return {
        content: replaceTemplate(templatePart),
        bold: templatePart.match(templateRegexPattern) != null,
      };
    };

    const messageSplitedTemplate = messageTemplate.split(templateRegexPattern);
    const messageParts = messageSplitedTemplate.map(toMessagePart);

    const creationMoment = moment(creationTime.valueOf());
    creationMoment.locale(i18n.language);

    return (
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={handleCardPress}
        key={id}
      >
        <View style={styles.imageContainer}>
          <EventHubImage
            imageId={image.imageId}
            filename={image.smallFilename}
          />
          <View style={[styles.mark, { backgroundColor: getMarkColor() }]}>
            {getMarkIcon()}
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={[styles.text, seen ? null : styles.notSeenText]}
            numberOfLines={3}
            textBreakStrategy="simple"
            lineBreakStrategyIOS="standard"
          >
            {messageParts.map(({ content, bold }) => {
              return (
                <Text style={[bold ? { fontWeight: "bold" } : null]}>
                  {content}
                </Text>
              );
            })}
          </Text>
          <Text style={[styles.time, seen ? null : styles.notSeenTime]}>
            {creationMoment.fromNow()}
          </Text>
        </View>
        <View style={styles.rightMarkContainer}>
          {seen ? null : <View style={styles.rightMark}></View>}
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  imageContainer: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 15,
    position: "relative",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
  },
  mark: {
    position: "absolute",
    backgroundColor: "green",
    borderRadius: 100,
    padding: 6,
    right: -5,
    bottom: -5,
  },
  textContainer: {
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  text: {
    flex: 1,
    marginRight: "5%",
    fontSize: 15,
    flexWrap: "wrap",
    color: "#4E4E4F",
  },
  notSeenText: {
    color: "#000000",
  },
  time: {
    flex: 1,
    marginRight: "5%",
    fontSize: 15,
    flexWrap: "wrap",
    fontWeight: "bold",
    color: "#4E4E4F",
  },
  notSeenTime: {
    color: "#016531",
  },
  rightMarkContainer: {
    width: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  rightMark: {
    borderRadius: 100,
    borderWidth: 5,
    overflow: "hidden",
    borderColor: "#016531",
    backgroundColor: "#016531",
  },
});
