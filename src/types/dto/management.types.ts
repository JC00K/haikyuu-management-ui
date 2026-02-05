import { Role } from "../enums/role.enum";
import { Year } from "../enums/year.enum";
import { ManagementRole } from "../enums/management-role.enum";

/**
 * Management DTO
 * Maps to: com.example.haikyuuspring.controller.dto.ManagementDTO
 */
export interface ManagementDTO {
  /** Management member ID (read-only, assigned by backend) */
  readonly id?: number;

  /** Name */
  name: string;

  /** Height in cm */
  height: number;

  /** Age */
  age: number;

  /** Year (if student) */
  year: Year;

  /** Role (should always be MANAGEMENT) */
  role: Role;

  /** School ID */
  schoolId: number;

  /** School name (read-only, populated by backend) */
  readonly schoolName?: string;

  /** Image URL */
  imgUrl: string;

  /** Management role (advisor or manager) */
  managementRole: ManagementRole;
}

/**
 * Create Management Request (omits read-only fields)
 */
export type CreateManagementRequest = Omit<
  ManagementDTO,
  "id" | "schoolName" | "role"
> & {
  role?: Role.MANAGEMENT; // Optional since it should always be MANAGEMENT
};

/**
 * Update Management Request (partial with id required)
 */
export type UpdateManagementRequest = Partial<CreateManagementRequest> & {
  id: number;
};

/**
 * Management list item (for tables/cards)
 */
export type ManagementListItem = Required<ManagementDTO>;

/**
 * Management filters
 */
export interface ManagementFilters {
  managementRole?: ManagementRole;
  year?: Year;
  schoolId?: number;
}

/**
 * Helper type for management by role
 */
export interface ManagementByRole {
  advisors: ManagementDTO[];
  managers: ManagementDTO[];
}
