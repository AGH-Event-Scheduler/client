import { OrganizationRole } from "../api/types";
import { useEffect, useState } from "react";
import {
  getUserRolesForOrganization,
  hasLoggedUserAnyAuthorities,
  isLoggedAsAdmin,
} from "../api/user-api-utlis";

const editingRoles = [OrganizationRole.HEAD, OrganizationRole.CONTENT_CREATOR];

const userManagementRoles = [OrganizationRole.HEAD];

export const useUserRoles = (
  organizationId: number | null,
): {
  userRoles: OrganizationRole[];
  hasEditingRole: boolean;
  hasUserManagementRole: boolean;
} => {
  const [userRoles, setUserRoles] = useState<OrganizationRole[]>([]);
  const [hasEditingRole, setHasEditingRole] = useState(false);
  const [hasUserManagementRole, setHasUserManagementRole] = useState(false);

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        if (organizationId !== null) {
          const roles = await getUserRolesForOrganization(organizationId);
          setUserRoles(roles);
          setHasEditingRole(roles.some((role) => editingRoles.includes(role)));
          setHasUserManagementRole(
            roles.some((role) => userManagementRoles.includes(role)),
          );
        }
      } catch (error) {
        console.error("Error fetching user roles:", error);
      }
    };

    fetchUserRoles();
  }, [organizationId]);

  return { userRoles, hasEditingRole, hasUserManagementRole };
};

export const useUserAuthorities = (
  showNavbar: boolean,
): { isAdmin: boolean; hasAnyOrganizationRole: boolean } => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [hasAnyOrganizationRole, setHasAnyOrganizationRole] = useState(false);

  useEffect(() => {
    const fetchUserAuthorities = async () => {
      try {
        setHasAnyOrganizationRole(await hasLoggedUserAnyAuthorities());
        setIsAdmin(await isLoggedAsAdmin());
      } catch (error) {
        console.error("Error fetching user authorities:", error);
      }
    };

    fetchUserAuthorities();
  }, [showNavbar]);

  return { isAdmin, hasAnyOrganizationRole };
};
