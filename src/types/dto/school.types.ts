import { RosterDTO } from "./roster.types";

/**
 * School DTO
 * Maps to: com.example.haikyuuspring.controller.dto.SchoolDTO
 */
export interface SchoolDTO {
  /** School ID (read-only, assigned by backend) */
  readonly id?: number;

  /** School name */
  name: string;

  /** Prefecture/region */
  prefecture: string;

  /** School roster */
  roster: RosterDTO;

  /** School motto */
  motto: string;

  /** School colors */
  colors: string;

  /** School mascot */
  mascot: string;

  /** School image URL */
  imgUrl: string;
}

/**
 * School Lookup DTO (for dropdowns)
 * Maps to: com.example.haikyuuspring.controller.dto.SchoolLookupDTO
 */
export interface SchoolLookupDTO {
  /** School ID */
  id: number;

  /** School name */
  name: string;
}

/**
 * Create School Request (omits read-only fields and roster)
 */
export type CreateSchoolRequest = Omit<SchoolDTO, "id" | "roster"> & {
  roster?: RosterDTO; // Optional on creation
};

/**
 * Update School Request (partial with id required)
 */
export type UpdateSchoolRequest = Partial<CreateSchoolRequest> & { id: number };

/**
 * School list item (for tables/cards)
 */
export type SchoolListItem = Required<SchoolDTO>;

/**
 * School with metadata (for detailed views)
 */
export interface SchoolWithMetadata extends SchoolDTO {
  totalStudents: number;
  totalStaff: number;
  foundedYear?: number;
  region?: string;
}

/**
 * School filters
 */
export interface SchoolFilters {
  prefecture?: string;
  name?: string;
}

/**
 * School statistics
 */
export interface SchoolStats {
  totalSchools: number;
  schoolsByPrefecture: Record<string, number>;
  averageRosterSize: number;
}

/**
 * Helper function to get school display info
 */
export const getSchoolDisplayInfo = (
  school: SchoolDTO | SchoolLookupDTO,
): string => {
  if ("prefecture" in school) {
    return `${school.name} (${school.prefecture})`;
  }
  return school.name;
};
