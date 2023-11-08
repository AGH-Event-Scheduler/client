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
): Promise<{ [date: string]: OrganizationEvent[] }> => {
  var response = await fetchApi({
    url: "/events/groupedByDate",
    queryParams: {
      startDate: toSimpleDateString(startDate),
      endDate: toSimpleDateString(endDate),
      language: getCurrentLanguage(),
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
