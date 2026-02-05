/**
 * Coaching style enum
 * Maps to: com.example.haikyuuspring.model.enums.CoachingStyle
 */
export enum CoachingStyle {
  NONCOACH = "NONCOACH",
  DEFENSE = "DEFENSE",
  ATTACK = "ATTACK",
  BLOCK = "BLOCK",
  AGGRESSIVE = "AGGRESSIVE",
  POWER = "POWER",
}

/**
 * Get display name for CoachingStyle
 */
export const getCoachingStyleDisplayName = (style: CoachingStyle): string => {
  const displayNames: Record<CoachingStyle, string> = {
    [CoachingStyle.NONCOACH]: "Non-Coach",
    [CoachingStyle.DEFENSE]: "Defense",
    [CoachingStyle.ATTACK]: "Attack",
    [CoachingStyle.BLOCK]: "Block",
    [CoachingStyle.AGGRESSIVE]: "Aggressive",
    [CoachingStyle.POWER]: "Power",
  };
  return displayNames[style];
};

/**
 * Get all coaching styles as array (excluding NONCOACH)
 */
export const getAllCoachingStyles = (
  includeNonCoach = false,
): CoachingStyle[] => {
  const styles = Object.values(CoachingStyle);
  return includeNonCoach
    ? styles
    : styles.filter((s) => s !== CoachingStyle.NONCOACH);
};
