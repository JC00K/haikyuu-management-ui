import { Role } from "../enums/role.enum";

/**
 * Fan DTO
 * Maps to: com.example.haikyuuspring.controller.dto.FanDTO
 */
export interface FanDTO {
  /** Fan ID (read-only, assigned by backend) */
  readonly id?: number;

  /** Fan name */
  name: string;

  /** Height in cm */
  height: number;

  /** Age */
  age: number;

  /** Role (should always be FAN) */
  role: Role;

  /** School ID */
  schoolId: number;

  /** School name (read-only, populated by backend) */
  readonly schoolName?: string;

  /** Image URL */
  imgUrl: string;
}

/**
 * Create Fan Request (omits read-only fields)
 */
export type CreateFanRequest = Omit<FanDTO, "id" | "schoolName" | "role"> & {
  role?: Role.FAN; // Optional since it should always be FAN
};

/**
 * Update Fan Request (partial with id required)
 */
export type UpdateFanRequest = Partial<CreateFanRequest> & { id: number };

/**
 * Fan list item (for tables/cards)
 */
export type FanListItem = Required<FanDTO>;

/**
 * Fan filters
 */
export interface FanFilters {
  schoolId?: number;
  age?: number;
}
