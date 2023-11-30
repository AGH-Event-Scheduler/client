import { OrganizationRole } from "./types";
import { fetchApiWithRefresh, Method } from "./api-utils";

export const getUserRolesForOrganization = async (
  organizationId: number,
): Promise<Array<OrganizationRole>> => {
  const url = `/users/organization-roles/${organizationId}`;

  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.GET,
    });

    if (!response.ok) {
      console.error(
        `Fetching user roles for organization ${organizationId} failed:`,
        response.statusText,
      );
      return Array();
    }

    const data = await response.json();
    return data as Array<OrganizationRole>;
  } catch (error) {
    console.error("Error during fetching user roles:", error);
  }
};

export const grantOrganizationRole = async (
  organizationId: number,
  email: string,
  role: string,
): Promise<Boolean> => {
  const url = `/users/organization-roles/${organizationId}/grant`;

  let queryParams;
  if (role != "USER") {
    queryParams = {
      email: email,
      role: role,
    };
  } else {
    queryParams = {
      email: email,
    };
  }

  try {
    const response = await fetchApiWithRefresh({
      url: url,
      method: Method.POST,
      queryParams: queryParams,
    });
    if (response === null) {
      return false;
    }
    if (!response.ok) {
      console.error(
        `Assigning ${role} for ${email} failed (organizationId: ${organizationId}:`,
        response.statusText,
      );
      return false;
    }
    return true;
  } catch (error) {
    console.error(
      "Assigning ${role} for ${email} failed (organizationId: ${organizationId}:",
      error,
    );
  }
};
