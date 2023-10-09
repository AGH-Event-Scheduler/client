import { fetchApi } from "./api-utils";
import { OrganizationEvent } from "./types";

export const fetchEvents = async (): Promise<OrganizationEvent[]> => {
  var response = await fetchApi("/events");
  return response.json();
};

export const fetchOrganizationEvents = async (
  organizationId: number,
): Promise<OrganizationEvent[]> => {
  var response = await fetchApi(`/events/organization/${organizationId}`);
  return response.json();
};

export const fetchEventDetails = async (
  eventId: number,
): Promise<OrganizationEvent> => {
  var response = await fetchApi(`/events/${eventId}`);
  return response.json();
};
