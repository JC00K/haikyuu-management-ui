import { get, patch } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { CharacterDTO, CharacterSearchParams } from "../../types/dto";
import { Role, Year } from "../../types/enums";

/**
 * Character Service
 * Handles all character-related API calls
 *
 * COMPLETE - All 12 methods matching CharacterController endpoints
 */
export const characterService = {
  /**
   * Get all characters
   * GET /api/v1/characters
   */
  getAll: (): Promise<CharacterDTO[]> => {
    return get<CharacterDTO[]>(API_ENDPOINTS.CHARACTERS.BASE);
  },

  /**
   * Get character by ID
   * GET /api/v1/characters/id/{id}
   */
  getById: (id: number): Promise<CharacterDTO> => {
    return get<CharacterDTO>(API_ENDPOINTS.CHARACTERS.BY_ID(id));
  },

  /**
   * Get characters by age
   * GET /api/v1/characters/age/{age}
   */
  getByAge: (age: number): Promise<CharacterDTO[]> => {
    return get<CharacterDTO[]>(API_ENDPOINTS.CHARACTERS.BY_AGE(age));
  },

  /**
   * Get characters by year
   * GET /api/v1/characters/year/{year}
   */
  getByYear: (year: Year): Promise<CharacterDTO[]> => {
    return get<CharacterDTO[]>(API_ENDPOINTS.CHARACTERS.BY_YEAR(year));
  },

  /**
   * Get characters by role
   * GET /api/v1/characters/roles/{role}
   */
  getByRole: (role: Role): Promise<CharacterDTO[]> => {
    return get<CharacterDTO[]>(API_ENDPOINTS.CHARACTERS.BY_ROLE(role));
  },

  /**
   * Get characters by school
   * GET /api/v1/schools/{school}/characters
   */
  getBySchool: (school: string): Promise<CharacterDTO[]> => {
    return get<CharacterDTO[]>(API_ENDPOINTS.CHARACTERS.BY_SCHOOL(school));
  },

  /**
   * Get characters with height greater than specified value
   * GET /api/v1/characters/greater_than_{height}
   */
  getByHeightGreaterThan: (height: number): Promise<CharacterDTO[]> => {
    return get<CharacterDTO[]>(
      API_ENDPOINTS.CHARACTERS.HEIGHT_GREATER_THAN(height),
    );
  },

  /**
   * Get characters with height less than specified value
   * GET /api/v1/characters/less_than_{height}
   */
  getByHeightLessThan: (height: number): Promise<CharacterDTO[]> => {
    return get<CharacterDTO[]>(
      API_ENDPOINTS.CHARACTERS.HEIGHT_LESS_THAN(height),
    );
  },

  /**
   * Search characters by year and role
   * GET /api/v1/characters/search/role?year={year}&role={role}
   */
  searchByYearAndRole: (
    params: CharacterSearchParams,
  ): Promise<CharacterDTO[]> => {
    return get<CharacterDTO[]>(
      API_ENDPOINTS.CHARACTERS.SEARCH_BY_YEAR_AND_ROLE,
      {
        params,
      },
    );
  },

  /**
   * Assign year to character
   * PATCH /api/v1/characters/assign_year/{id}
   */
  assignYear: (id: number, year: Year): Promise<CharacterDTO> => {
    return patch<CharacterDTO>(API_ENDPOINTS.CHARACTERS.ASSIGN_YEAR(id), {
      year,
    });
  },

  /**
   * Assign school to character
   * PATCH /api/v1/characters/assign_school/{id}
   */
  assignSchool: (id: number, school: string): Promise<CharacterDTO> => {
    return patch<CharacterDTO>(API_ENDPOINTS.CHARACTERS.ASSIGN_SCHOOL(id), {
      school,
    });
  },

  /**
   * Assign age to character
   * PATCH /api/v1/characters/assign_age/{id}
   */
  assignAge: (id: number, age: number): Promise<CharacterDTO> => {
    return patch<CharacterDTO>(API_ENDPOINTS.CHARACTERS.ASSIGN_AGE(id), {
      age,
    });
  },
};

export default characterService;
