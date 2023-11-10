import { getCurrentLanguage } from "../localization/languages";
import { AllEventsViewTypeOption } from "../pages/all-events/AllEventsView";
import { toSimpleDateString, toUTCDate } from "../utils/date";
import {
  FormDataFileUpload,
  Method,
  MultiLanguageText,
  fetchApi,
} from "./api-utils";
import { OrganizationEvent } from "./types";
export const fetchEvents = async (): Promise<OrganizationEvent[]> => {
  var response = await fetchApi({ url: "/events" });
  return response.json();
};

export const fetchEventsInDateRange = async (
  startDate: Date,
  endDate: Date,
  savedOnly: boolean = false,
  fromFollowedOnly: boolean = false,
): Promise<{ [date: string]: OrganizationEvent[] }> => {
  var response = await fetchApi({
    url: "/events/groupedByDate",
    queryParams: {
      startDate: toSimpleDateString(startDate),
      endDate: toSimpleDateString(endDate),
      language: getCurrentLanguage(),
      savedOnly: savedOnly,
      fromFollowedOnly: fromFollowedOnly,
    },
  });
  return response.json();
};

export const fetchOrganizationEvents = async (
  organizationId: number,
  eventsType: AllEventsViewTypeOption,
): Promise<OrganizationEvent[]> => {
  var response = await fetchApi({
    url: `/events`,
    queryParams: {
      type: eventsType,
      language: getCurrentLanguage(),
      organizationId: organizationId,
    },
  });

  return response.json();
};

export const fetchEventDetails = async (
  eventId: number,
): Promise<OrganizationEvent> => {
  var response = await fetchApi({
    url: `/events/${eventId}`,
    queryParams: { language: getCurrentLanguage() },
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
  console.log(
    organizationId,
    name,
    description,
    location,
    startDate,
    endDate,
    formDataImage,
  );

  const formData = new FormData();

  // @ts-ignore
  formData.append("backgroundImage", formDataImage);
  formData.append("name", JSON.stringify(name));
  formData.append("description", JSON.stringify(description));
  formData.append("location", JSON.stringify(location));
  formData.append(
    "startDateTimestamp",
    toUTCDate(startDate).getTime().toString(),
  );
  formData.append("endDateTimestamp", toUTCDate(endDate).getTime().toString());

  var response = await fetchApi({
    url: `/events/organization/${organizationId}`,
    method: Method.POST,
    body: formData,
  });
  return response.json();
};

export const saveEventInCalendar = async (
  eventId: number,
): Promise<boolean> => {
  const url = "/events/save";
  try {
    const response = await fetchApi({
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
    const response = await fetchApi({
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
