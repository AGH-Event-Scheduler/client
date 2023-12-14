import { getCurrentLanguage } from "../localization/languages";
import { Method, fetchApiWithRefresh } from "./api-utils";
import { FeedNotification, Page } from "./types";

export const getFeed = async (
  notSeenOnly: boolean = false,
  page = 0,
  pageSize = 10,
): Promise<Page<FeedNotification>> => {
  const result = await fetchApiWithRefresh({
    url: "/feed",
    queryParams: {
      language: getCurrentLanguage(),
      showNotSeenOnly: notSeenOnly,
      page: page,
      size: pageSize,
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
