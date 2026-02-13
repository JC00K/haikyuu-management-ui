import { Role } from "../enums/role.enum";
import { CoachRole } from "../enums/coach-role.enum";
import { CoachingStyle } from "../enums/coaching-style.enum";
import { Year } from "../enums/year.enum";

/**
 * Coach DTO
 * Maps to: com.example.haikyuuspring.controller.dto.CoachDTO
 */
export interface CoachDTO {
  /** Coach ID (read-only, assigned by backend) */
  readonly id?: number;

  /** Coach name */
  name: string;

  /** Height in cm */
  height: number;

  /** Age */
  age: number;

  /** Role (should always be COACH) */
  role: Role;

  year: Year;

  /** School ID */
  schoolId: number;

  /** School name (read-only, populated by backend) */
  readonly schoolName?: string;

  /** Image URL */
  imgUrl: string;

  /** Is retired */
  isRetired: boolean;

  /** Coach role (head or assistant) */
  coachRole: CoachRole;

  /** Coaching style */
  coachingStyle: CoachingStyle;
}

/**
 * Create Coach Request (omits read-only fields)
 */
export type CreateCoachRequest = Omit<
  CoachDTO,
  "id" | "schoolName" | "role"
> & {
  role?: Role.COACH; // Optional since it should always be COACH
};

/**
 * Update Coach Request (partial with id required)
 */
export type UpdateCoachRequest = Partial<CreateCoachRequest> & { id: number };

/**
 * Coach list item (for tables/cards)
 */
export type CoachListItem = Required<CoachDTO>;

/**
 * Coach filters
 */
export interface CoachFilters {
  coachRole?: CoachRole;
  coachingStyle?: CoachingStyle;
  isRetired?: boolean;
  schoolId?: number;
}

/**
 * Helper type for coaches by role
 */
export interface CoachesByRole {
  headCoaches: CoachDTO[];
  assistantCoaches: CoachDTO[];
}
