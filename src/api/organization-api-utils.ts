import {fetchApiWithRefresh, Method} from "./api-utils";
import {Organization} from "./types";

export const fetchAllOrganizationsWithStatusByUser = async (
  onlySubscribed = false,
  nameSearchQuery = "",
): Promise<Organization[]> => {
  const url = "/organizations";
  const queryParams = {
    subscribedOnly: onlySubscribed,
  };
  if (nameSearchQuery !== "") {
    queryParams["name"] = nameSearchQuery;
  }

  try {
    const response = await fetchApiWithRefresh({url: url, queryParams: queryParams});
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

export const fetchOrganizationById = async (
  organizationId: number,
): Promise<Organization> => {
  const url = `/organizations/${organizationId}`;

  try {
    const response = await fetchApiWithRefresh({url: url});
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
  const url = "/organizations/subscribe";
  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      queryParams: {
        organizationId: organizationId,
      },
    });

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
  const url = "/organizations/unsubscribe";
  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      queryParams: {
        organizationId: organizationId,
      },
    });
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
