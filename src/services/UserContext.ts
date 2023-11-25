import { OrganizationRole } from "../api/types";
import { getUserRolesForOrganization } from "../api/user-api-utlis";

export class UserProvider {
  static async hasUserOrganizationRole(
    organizationId: number,
    role: OrganizationRole,
  ): Promise<boolean> {
    const userRoles = await getUserRolesForOrganization(organizationId);
    console.log(` Organization roles for user: ${userRoles}`);
    return userRoles.includes(role);
  }
}
