import { getCurrentLanguage } from "../localization/languages";
import { AllEventsViewTypeOption } from "../pages/all-events/AllEventsView";
import { toSimpleDateString, toUTCDate } from "../utils/date";
import {
  fetchApiWithRefresh,
  FormDataFileUpload,
  Method,
} from "./api-utils";
import { FullOrganizationEvent, MultiLanguageText } from "./types";
import { OrganizationEvent } from "./types";

export const fetchEvents = async (): Promise<OrganizationEvent[]> => {
  var response = await fetchApiWithRefresh({ url: "/events" });
  return response.json();
};

export const fetchEventsInDateRange = async (
  startDate: Date,
  endDate: Date,
  nameSearchQuery: string = "",
  savedOnly: boolean = false,
  fromFollowedOnly: boolean = false,
): Promise<{ [date: string]: OrganizationEvent[] }> => {
  const queryParams = {
    startDate: toSimpleDateString(startDate),
    endDate: toSimpleDateString(endDate),
    language: getCurrentLanguage(),
    savedOnly: savedOnly,
    fromFollowedOnly: fromFollowedOnly,
  };

  console.log(nameSearchQuery, nameSearchQuery.length);

  if (nameSearchQuery.length > 0) {
    queryParams["name"] = nameSearchQuery;
  }

  var response = await fetchApiWithRefresh({
    url: "/events/groupedByDate",
    queryParams: queryParams,
  });
  return response.json();
};

export const fetchOrganizationEvents = async (
  organizationId: number,
  eventsType: AllEventsViewTypeOption,
  nameSearchQuery = "",
): Promise<OrganizationEvent[]> => {
  const queryParams = {
    type: eventsType,
    language: getCurrentLanguage(),
    organizationId: organizationId,
  };
  if (nameSearchQuery.length > 0) {
    queryParams["name"] = nameSearchQuery;
  }
  var response = await fetchApiWithRefresh({
    url: `/events`,
    queryParams: queryParams,
  });

  return response.json();
};

export const fetchEventDetails = async (
  eventId: number,
): Promise<OrganizationEvent> => {
  var response = await fetchApiWithRefresh({
    url: `/events/${eventId}`,
    queryParams: { language: getCurrentLanguage() },
  });
  return response.json();
};

export const fetchFullEventDetails = async (
  eventId: number,
): Promise<FullOrganizationEvent> => {
  var response = await fetchApiWithRefresh({
    url: `/events/${eventId}/full`,
  });
  return response.json();
};

export const createEvent = async (
  organizationId: number,
  name: MultiLanguageText,
  description: MultiLanguageText,
  location: MultiLanguageText,
  startDate: Date,
  endDate: Date,
  formDataImage: FormDataFileUpload,
) => {
  const formData = new FormData();

  // @ts-ignore
  formData.append("backgroundImage", formDataImage);
  formData.append("name", JSON.stringify(name));
  formData.append("description", JSON.stringify(description));
  formData.append("location", JSON.stringify(location));
  formData.append("startDateTimestamp", startDate.getTime().toString());
  formData.append("endDateTimestamp", endDate.getTime().toString());

  var response = await fetchApiWithRefresh({
    url: `/events/organization/${organizationId}`,
    method: Method.POST,
    body: formData,
  });
  return response.json();
};

export const updateEvent = async (
  eventId: number,
  name: MultiLanguageText,
  description: MultiLanguageText,
  location: MultiLanguageText,
  startDate: Date,
  endDate: Date,
  formDataImage?: FormDataFileUpload,
) => {
  const formData = new FormData();

  if (formDataImage) {
    // @ts-ignore
    formData.append("backgroundImage", formDataImage);
  }
  formData.append("name", JSON.stringify(name));
  formData.append("description", JSON.stringify(description));
  formData.append("location", JSON.stringify(location));
  formData.append("startDateTimestamp", startDate.getTime().toString());
  formData.append("endDateTimestamp", endDate.getTime().toString());

  var response = await fetchApiWithRefresh({
    url: `/events/${eventId}`,
    method: Method.PUT,
    body: formData,
  });
  return response.json();
};

export const saveEventInCalendar = async (
  eventId: number,
): Promise<boolean> => {
  const url = "/events/save";
  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      queryParams: {
        eventId: eventId,
      },
    });

    if (!response.ok) {
      console.error("Saving failed:", response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error during saving:", error);
    throw error;
  }
};

export const removeEventFromCalendar = async (
  eventId: number,
): Promise<boolean> => {
  const url = "/events/remove";
  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      queryParams: {
        eventId: eventId,
      },
    });
    if (!response.ok) {
      console.error("Removing failed:", response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error during removing:", error);
    throw error;
  }
};

export const cancelEvent = async (eventId: number): Promise<boolean> => {
  const url = "/events/cancel";
  try {
    const response = await fetchApi({
      url: url,
      method: Method.POST,
      queryParams: {
        eventId: eventId,
      },
    });
    if (!response.ok) {
      console.error("Canceling failed:", response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error during canceling:", error);
    throw error;
  }
};

export const reenableEvent = async (eventId: number): Promise<boolean> => {
  const url = "/events/reenable";
  try {
    const response = await fetchApi({
      url: url,
      method: Method.POST,
      queryParams: {
        eventId: eventId,
      },
    });
    if (!response.ok) {
      console.error("Reenabling failed:", response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error during reenabling:", error);
    throw error;
  }
};
