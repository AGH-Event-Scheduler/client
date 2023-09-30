export interface Organization {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  isSubscribed: boolean;
}

const basePath = "http://127.0.0.1:8080/api";

export const fetchOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await fetch(basePath + "/organizations");
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
    const response = await fetch(basePath + `/organizations/${organizationId.toString()}`);

    console.log(basePath + `/organizations/${organizationId.toString()}`);
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
  updatedStatus: boolean
) => {
  try {
    const response = await fetch(
      basePath + `/organizations/${organizationId}/subscription`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStatus),
      }
    );

    if (response.ok) {
      console.log(
        `Subscription status updated for organization ${organizationId}. Now is ${updatedStatus}`
      );
    } else {
      throw new Error("Failed to update subscription status");
    }
  } catch (error) {
    console.log("Error updating subscription status:", error);
  }
};
