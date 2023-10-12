import { Method, baseUrl, fetchApi } from "./api-utils";
import { Organization } from "./types";

export const fetchOrganizations = async (): Promise<Organization[]> => {
  var response = await fetchApi("/organizations");
  return response.json();
};

export const fetchOrganizationDetails = async (
  organizationId: number,
): Promise<Organization> => {
  var response = await fetchApi(`/organizations/${organizationId}`);
  return response.json();
};

export const updateSubscriptionStatus = async (
  organizationId: number,
  updatedStatus: boolean,
) => {
  var response = await fetchApi(
    `/organizations/${organizationId}/subscription`,
    Method.PATCH,
    updatedStatus,
  );

  if (response.ok) {
    console.log(
      `Subscription status updated for organization ${organizationId}`,
    );
  }
};
