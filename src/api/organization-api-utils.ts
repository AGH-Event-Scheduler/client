import { baseUrl } from "./api-utils";
import { Organization } from "./types";

export const fetchOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await fetch(baseUrl + "/api/organizations");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching organizations:", error);
    throw error;
  }
};


export const fetchOrganizationDetails = async (
  organizationId: number,
): Promise<Organization> => {
  try {
    const response = await fetch(
      baseUrl + `/api/organizations/${organizationId.toString()}`,
    );

    console.log(baseUrl + `/api/organizations/${organizationId.toString()}`);
    console.log(organizationId);

    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching organizations:", error);
    throw error;
  }
};

export const updateSubscriptionStatus = async (
  organizationId: number,
  updatedStatus: boolean,
) => {
  try {
    const response = await fetch(
      baseUrl + `/api/organizations/${organizationId}/subscription`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStatus),
      },
    );

    if (response.ok) {
      console.log(
        `Subscription status updated for organization ${organizationId}. Now is ${updatedStatus}`,
      );
    } else {
      throw new Error("Failed to update subscription status");
    }
  } catch (error) {
    console.log("Error updating subscription status:", error);
  }
};
