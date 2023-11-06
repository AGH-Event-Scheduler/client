import i18next from "../localization/i18next";
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
  var response = await fetchApi("/events");
  return response.json();
};

export const fetchEventsInDateRange = async (
  startDate: Date,
  endDate: Date,
): Promise<{ [date: string]: OrganizationEvent[] }> => {
  var response = await fetchApi(
    `/events/byDate?startDate=${toSimpleDateString(
      startDate,
    )}&endDate=${toSimpleDateString(endDate)}`,
  );
  return response.json();
};

export const fetchOrganizationEvents = async (
  organizationId: number,
  eventsType: AllEventsViewTypeOption,
): Promise<OrganizationEvent[]> => {
  var response = await fetchApi(
    `/events/organization/${organizationId}?type=${eventsType}&language=${getCurrentLanguage()}`,
  );

  return response.json();
};

export const fetchEventDetails = async (
  eventId: number,
): Promise<OrganizationEvent> => {
  var response = await fetchApi(`/events/${eventId}?language=${getCurrentLanguage()}`);
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

  var response = await fetchApi(
    `/events/organization/${organizationId}`,
    Method.POST,
    formData,
  );
  return response.json();
};
