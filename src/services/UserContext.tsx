import { OrganizationRole } from "../api/types";
import { getUserRolesForOrganization } from "../api/user-api-utlis";
import { useEffect, useState } from "react";

export const useUserRoles = (
  organizationId: number | null,
): OrganizationRole[] => {
  const [userRoles, setUserRoles] = useState<OrganizationRole[]>([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        if (organizationId !== null) {
          const roles = await getUserRolesForOrganization(organizationId);
          setUserRoles(roles);
          console.log("USER ROLES", roles);
        }
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    fetchUserRoles();
  }, [organizationId]);

  return userRoles;
};
export const hasEditingRole = (roles: OrganizationRole[]): boolean => {
  const editingRoles = [
    OrganizationRole.HEAD,
    OrganizationRole.CONTENT_CREATOR,
  ];
  return roles.some((role) => editingRoles.includes(role));
};
