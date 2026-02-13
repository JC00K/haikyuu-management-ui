import { Role } from "../enums/role.enum";
import { Position } from "../enums/position.enum";
import { CoachingStyle } from "../enums/coaching-style.enum";
import { Year } from "../enums";

/**
 * Alumni DTO
 * Maps to: com.example.haikyuuspring.controller.dto.AlumniDTO
 *
 * Alumni can be former players, former coaches, or both
 */
export interface AlumniDTO {
  /** Alumni ID (read-only, assigned by backend) */
  readonly id?: number;

  /** Name */
  name: string;

  /** Height in cm */
  height: number;

  /** Age */
  age: number;

  year: Year;

  /** Role (should always be ALUMNI) */
  role: Role;

  /** School ID */
  schoolId: number;

  /** School name (read-only, populated by backend) */
  readonly schoolName?: string;

  /** Image URL */
  imgUrl: string;

  /** Was a former player */
  formerPlayer: boolean;

  /** Position (if former player) */
  position: Position;

  /** Jersey number (if former player) */
  jerseyNumber: number;

  /** Was a former coach */
  formerCoach: boolean;

  /** Coaching style (if former coach) */
  coachingStyle: CoachingStyle;
}

/**
 * Create Alumni Request (omits read-only fields)
 */
export type CreateAlumniRequest = Omit<
  AlumniDTO,
  "id" | "schoolName" | "role"
> & {
  role?: Role.ALUMNI; // Optional since it should always be ALUMNI
};

/**
 * Update Alumni Request (partial with id required)
 */
export type UpdateAlumniRequest = Partial<CreateAlumniRequest> & { id: number };

/**
 * Alumni list item (for tables/cards)
 */
export type AlumniListItem = Required<AlumniDTO>;

/**
 * Alumni filters
 */
export interface AlumniFilters {
  formerPlayer?: boolean;
  formerCoach?: boolean;
  position?: Position;
  coachingStyle?: CoachingStyle;
  schoolId?: number;
}

/**
 * Helper type for categorizing alumni
 */
export interface AlumniCategories {
  formerPlayersOnly: AlumniDTO[];
  formerCoachesOnly: AlumniDTO[];
  both: AlumniDTO[]; // Both player and coach
}

/**
 * Type guard to check if alumni was a former player
 */
export const isFormerPlayer = (alumni: AlumniDTO): boolean => {
  return alumni.formerPlayer;
};

/**
 * Type guard to check if alumni was a former coach
 */
export const isFormerCoach = (alumni: AlumniDTO): boolean => {
  return alumni.formerCoach;
};

/**
 * Type guard to check if alumni was both player and coach
 */
export const isFormerBoth = (alumni: AlumniDTO): boolean => {
  return alumni.formerPlayer && alumni.formerCoach;
};
