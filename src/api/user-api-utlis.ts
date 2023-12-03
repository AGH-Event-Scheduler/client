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

export const checkUserExist = async (userEmail: string): Promise<boolean> => {
  const url = `/users/exist`;
  try {
    const response = await fetchApiWithRefresh({
      url: url,
      queryParams: { email: userEmail },
    });

    if (!response.ok) {
      console.error(
        `Checking user with email ${userEmail} exist failed:`,
        response.statusText,
      );
      return false;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error while checking user exist: ", error);
  }
  return false;
};
