/**
 * Character role enum
 * Maps to: com.example.haikyuuspring.model.enums.Role
 */
export enum Role {
  PLAYER = "PLAYER",
  COACH = "COACH",
  MANAGEMENT = "MANAGEMENT",
  FAN = "FAN",
  ALUMNI = "ALUMNI",
}

/**
 * Get display name for Role
 */
export const getRoleDisplayName = (role: Role): string => {
  const displayNames: Record<Role, string> = {
    [Role.PLAYER]: "Player",
    [Role.COACH]: "Coach",
    [Role.MANAGEMENT]: "Management",
    [Role.FAN]: "Fan",
    [Role.ALUMNI]: "Alumni",
  };
  return displayNames[role];
};

/**
 * Get all roles as array
 */
export const getAllRoles = (): Role[] => Object.values(Role);
