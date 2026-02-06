/**
 * Coach role enum
 * Maps to: com.example.haikyuuspring.model.enums.CoachRole
 */
export enum CoachRole {
  HEAD = "HEAD",
  ASSISTANT = "ASSISTANT",
}

export const getCoachRoleDisplayName = (role: CoachRole): string => {
  const displayNames: Record<CoachRole, string> = {
    [CoachRole.HEAD]: "Head Coach",
    [CoachRole.ASSISTANT]: "Assistant Coach",
  };
  return displayNames[role];
};

export const getAllCoachRoles = (): CoachRole[] => Object.values(CoachRole);
