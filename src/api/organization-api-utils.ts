import {fetchApi, Method} from "./api-utils";
import {Organization} from "./types";
import {UserService} from "../services/UserService";


interface FetchOrganizationsOptions {
  userId?: string;
  subscribed?: boolean;
}

export const fetchOrganizations = async (
  options?: FetchOrganizationsOptions
): Promise<Organization[]> => {
  let response: Response;
  if (options && options.userId && options.subscribed) {
    response = await fetchApi(`/organizations/${options.userId}/subscribed`);
  } else if (options && options.userId) {
    response = await fetchApi(`/organizations/${options.userId}`);
  } else {
    response = await fetchApi("/organizations");
  }
  return response.json();
};

export const fetchOrganizationDetails = async (
  organizationId: number,
): Promise<Organization> => {
  const user = await UserService.getUser();
  let response: Response;
  if (user) {
    response = await fetchApi(`/organizations/details/${organizationId}/${user.id}`);
  } else {
    response = await fetchApi(`/organizations/details/${organizationId}`);
  }
  return response.json();
};

export const updateSubscriptionStatus = async (
  organizationId: number,
  updatedStatus: boolean,
) => {
  try {
    const user = await UserService.getUser();
    var response = await fetchApi(
      `/organizations/details/${organizationId}/subscription/${user.id}`,
      Method.PATCH,
      updatedStatus,
    );

    console.log("updateSubscriptionStatus PARAMS:",organizationId,updatedStatus,user.id)
    if (response.ok) {
      console.log(`Subscription status updated for organization ${organizationId}`);
    } else {
      console.error(`Failed to update subscription status for organization ${organizationId}`);
      console.log(response.json())
    }
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};
