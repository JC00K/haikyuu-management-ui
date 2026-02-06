/**
 * Management role enum
 * Maps to: com.example.haikyuuspring.model.enums.ManagementRole
 */
export enum ManagementRole {
  ADVISOR = "ADVISOR",
  MANAGER = "MANAGER",
}

export const getManagementRoleDisplayName = (role: ManagementRole): string => {
  const displayNames: Record<ManagementRole, string> = {
    [ManagementRole.ADVISOR]: "Advisor",
    [ManagementRole.MANAGER]: "Manager",
  };
  return displayNames[role];
};

export const getAllManagementRoles = (): ManagementRole[] =>
  Object.values(ManagementRole);
