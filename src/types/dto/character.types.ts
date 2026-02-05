import { Role } from "../enums/role.enum";
import { Year } from "../enums/year.enum";

/**
 * Base Character DTO
 * Maps to: com.example.haikyuuspring.controller.dto.CharacterDTO
 *
 * This is the base type for all character-related DTOs.
 * Note: In the Java backend, Character is abstract. This represents the DTO form.
 */
export interface CharacterDTO {
  /** Character ID (read-only, assigned by backend) */
  readonly id?: number;

  /** School ID */
  schoolId: number;

  /** School name (read-only, populated by backend) */
  readonly schoolName?: string;

  /** Character name */
  name: string;

  /** Character role */
  role: Role;

  /** Character age */
  age: number;

  /** Character year (if student) */
  year: Year;

  /** Height in cm */
  height: number;

  /** Image URL */
  imgUrl: string;
}

/**
 * Create Character Request (omits read-only fields)
 */
export type CreateCharacterRequest = Omit<CharacterDTO, "id" | "schoolName">;

/**
 * Update Character Request (partial with id required)
 */
export type UpdateCharacterRequest = Partial<CreateCharacterRequest> & {
  id: number;
};

/**
 * Character list item (for tables/cards)
 */
export type CharacterListItem = Required<CharacterDTO>;

/**
 * Character filters for search/filtering
 */
export interface CharacterFilters {
  age?: number;
  year?: Year;
  role?: Role;
  heightGreaterThan?: number;
  heightLessThan?: number;
  schoolId?: number;
}

/**
 * Character search params (for query params)
 */
export interface CharacterSearchParams {
  year?: Year;
  role?: Role;
}
