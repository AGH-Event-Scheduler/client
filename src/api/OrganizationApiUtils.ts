export interface Organization {
  id: number;
  imageUrl: string;
  name: string;
  isSubscribed: boolean;
}

const basePath = "http://localhost:8080";

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

export const updateSubscriptionStatus = async (
  organizationId: number,
  updatedStatus: boolean
) => {
  try {
    const response = await fetch(
      basePath + `/organizations/${organizationId}/subscription`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStatus),
      }
    );

    if (response.ok) {
      console.log(
        `Subscription status updated for organization ${organizationId}`
      );
    } else {
      throw new Error("Failed to update subscription status");
    }
  } catch (error) {
    console.log("Error updating subscription status:", error);
  }
};
