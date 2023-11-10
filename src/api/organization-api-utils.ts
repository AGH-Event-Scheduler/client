import { fetchApiWithRefresh, Method } from "./api-utils";
import { Organization } from "./types";

export const getAllOrganizationsWithStatusByUser = async (
  onlySubscribed = false,
): Promise<Organization[]> => {
  const endpoint = onlySubscribed
    ? "/organizations/subscribed"
    : "/organizations";

  try {
    const response = await fetchApiWithRefresh(endpoint, Method.GET);
    const data = await response.json();

    if (response.ok) {
      return data as Organization[];
    } else {
      console.error(
        `Fetching organizations${
          onlySubscribed ? " (subscribed)" : ""
        } failed:`,
        data,
      );
      return null;
    }
  } catch (error) {
    console.error(
      `Error fetching organizations${onlySubscribed ? " (subscribed)" : ""}:`,
      error,
    );
    throw error;
  }
};

export const getOrganizationById = async (
  organizationId: number,
): Promise<Organization> => {
  const endpoint = `/organizations/${organizationId}`;

  try {
    const response = await fetchApiWithRefresh(endpoint, Method.GET);
    const data = await response.json();

    if (response.ok) {
      return data as Organization;
    } else {
      console.error("Fetching organization by ID failed:", data);
      return null;
    }
  } catch (error) {
    console.error("Error fetching organization by ID:", error);
    throw error;
  }
};

export const subscribeToOrganization = async (
  organizationId: number,
): Promise<boolean> => {
  const endpoint = "/organizations/subscribe";
  try {
    const response = await fetchApiWithRefresh(
      endpoint,
      Method.POST,
      null,
      true,
      {
        organizationId: organizationId,
      },
    );

    if (!response.ok) {
      console.error("Subscription failed:", response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error during subscription:", error);
    throw error;
  }
};

export const unsubscribeFromOrganization = async (
  organizationId: number,
): Promise<boolean> => {
  const endpoint = "/organizations/unsubscribe";
  try {
    const response = await fetchApiWithRefresh(
      endpoint,
      Method.POST,
      null,
      true,
      {
        organizationId: organizationId,
      },
    );
    if (!response.ok) {
      console.error("Unsubscribing failed:", response.statusText);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Error during Unsubscribing:", error);
    throw error;
  }
};
