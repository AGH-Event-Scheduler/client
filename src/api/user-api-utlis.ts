import { OrganizationRole, UserWithRole } from "./types";
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

export const fetchAllUsersDataWithRoleForOrganization = async (
  searchQuery = "",
  organizationId: number,
  page = 0,
  pageSize = 10,
): Promise<{ users: UserWithRole[]; totalPages: number }> => {
  try {
    const queryParams = {
      page: page,
      size: pageSize,
    };

    if (searchQuery !== "") {
      queryParams["search"] = searchQuery;
    }

    const response = await fetchApiWithRefresh({
      url: `/users/all/${organizationId}`,
      queryParams: queryParams,
    });

    const data = await response.json();
    if (response.ok) {
      return {
        users: data.content,
        totalPages: data.totalPages,
      };
    } else {
      console.log("Fetching users failed: ", data);
      return {
        users: [],
        totalPages: 0,
      };
    }
  } catch (error) {
    console.log("Error while fetching users: ", error);
    return {
      users: [],
      totalPages: 0,
    };
  }
};

export const fetchUser = async () => {
  try {
    const response = await fetchApiWithRefresh({
      url: "/users",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log("Fetching user failed: ", data);
    }
  } catch (error) {
    console.log("Error while fetching user: ", error);
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
