/**
 * Player position enum
 * Maps to: com.example.haikyuuspring.model.enums.Position
 */
export enum Position {
  SETTER = "SETTER",
  MIDDLE_BLOCKER = "MIDDLE_BLOCKER",
  WING_SPIKER = "WING_SPIKER",
  OUTSIDE_HITTER = "OUTSIDE_HITTER",
  LIBERO = "LIBERO",
  NONE = "NONE",
}

export const getPositionDisplayName = (position: Position): string => {
  const displayNames: Record<Position, string> = {
    [Position.SETTER]: "Setter",
    [Position.MIDDLE_BLOCKER]: "Middle Blocker",
    [Position.WING_SPIKER]: "Wing Spiker",
    [Position.OUTSIDE_HITTER]: "Outside Hitter",
    [Position.LIBERO]: "Libero",
    [Position.NONE]: "None",
  };
  return displayNames[position];
};

export const getPositionAbbreviation = (position: Position): string => {
  const abbreviations: Record<Position, string> = {
    [Position.SETTER]: "S",
    [Position.MIDDLE_BLOCKER]: "MB",
    [Position.WING_SPIKER]: "WS",
    [Position.OUTSIDE_HITTER]: "OH",
    [Position.LIBERO]: "L",
    [Position.NONE]: "-",
  };
  return abbreviations[position];
};

export const getAllPositions = (includeNone = false): Position[] => {
  const positions = Object.values(Position);
  return includeNone ? positions : positions.filter((p) => p !== Position.NONE);
};
