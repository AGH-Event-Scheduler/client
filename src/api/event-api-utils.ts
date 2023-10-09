import { fetchApi } from "./api-utils";
import { Event } from "./types";

export const fetchEvents = async (): Promise<Event[]> => {
  var response = await fetchApi("/events");
  return response.json();
};

export const fetchOrganizationEvents = async (
  organizationId: number,
): Promise<Event[]> => {
  var response = await fetchApi(`/events/organization/${organizationId}`);
  return response.json();
};

export const fetchEventDetails = async (eventId: number): Promise<Event> => {
  var response = await fetchApi(`/events/${eventId}`);
  return response.json();
};
