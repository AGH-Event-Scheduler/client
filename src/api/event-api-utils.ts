import { AllEventsViewTypeOption } from "../pages/all-events/AllEventsView";
import { toSimpleDateString, toUTCDate } from "../utils/date";
import {
  fetchApiWithRefresh,
  FormDataFileUpload,
  Method,
  MultiLanguageText,
} from "./api-utils";
import { OrganizationEvent } from "./types";

export const fetchEvents = async (): Promise<OrganizationEvent[]> => {
  var response = await fetchApiWithRefresh("/events");
  return response.json();
};

export const fetchEventsInDateRange = async (
  startDate: Date,
  endDate: Date,
): Promise<{ [date: string]: OrganizationEvent[] }> => {
  var response = await fetchApiWithRefresh(
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
  var response = await fetchApiWithRefresh(
    `/events/organization/${organizationId}?type=${eventsType}`,
  );

  return response.json();
};

export const fetchEventDetails = async (
  eventId: number,
): Promise<OrganizationEvent> => {
  var response = await fetchApiWithRefresh(`/events/${eventId}`);
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

  var response = await fetchApiWithRefresh(
    `/events/organization/${organizationId}`,
    Method.POST,
    formData,
  );
  return response.json();
};
