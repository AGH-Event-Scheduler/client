import { getCurrentLanguage } from "../localization/languages";
import { Method, fetchApiWithRefresh } from "./api-utils";
import { FeedNotification } from "./types";

export const getFeed = async (
  notSeenOnly: boolean = false,
): Promise<FeedNotification[]> => {
  const result = await fetchApiWithRefresh({
    url: "/feed",
    queryParams: {
      language: getCurrentLanguage(),
      showNotSeenOnly: notSeenOnly,
    },
  });

  return result.json();
};

export const markNotificationAsSeen = async (notificationId: number) => {
  return fetchApiWithRefresh({
    url: `/feed/${notificationId}`,
    method: Method.POST,
  });
};

export const markAllAsSeen = async () => {};
