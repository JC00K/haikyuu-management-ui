import { get, post, del } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import {
  SchoolDTO,
  SchoolLookupDTO,
  CreateSchoolRequest,
} from "../../types/dto";
import { CharacterDTO } from "../../types/dto";

/**
 * School Service
 * Handles all school-related API calls
 */
export const schoolService = {
  /**
   * Get school lookup data (for dropdowns)
   * GET /api/v1/schools
   */
  getSchoolLookup: (): Promise<SchoolLookupDTO[]> => {
    return get<SchoolLookupDTO[]>(API_ENDPOINTS.SCHOOLS.LOOKUP);
  },

  /**
   * Get detailed school information
   * GET /api/v1/schools/{school}/info
   */
  getSchoolInfo: (schoolId: number): Promise<SchoolDTO> => {
    return get<SchoolDTO>(API_ENDPOINTS.SCHOOLS.INFO(schoolId));
  },

  /**
   * Get all characters at a school
   * GET /api/v1/schools/{school}/characters
   */
  getCharactersBySchool: (school: string): Promise<CharacterDTO[]> => {
    return get<CharacterDTO[]>(API_ENDPOINTS.SCHOOLS.CHARACTERS(school));
  },

  /**
   * Get schools by prefecture
   * GET /api/v1/schools/{prefecture}
   */
  getSchoolsByPrefecture: (prefecture: string): Promise<SchoolDTO[]> => {
    return get<SchoolDTO[]>(API_ENDPOINTS.SCHOOLS.BY_PREFECTURE(prefecture));
  },

  /**
   * Create a new school
   * POST /api/v1/schools
   */
  createSchool: (school: CreateSchoolRequest): Promise<SchoolDTO> => {
    return post<SchoolDTO, CreateSchoolRequest>(
      API_ENDPOINTS.SCHOOLS.BASE,
      school,
    );
  },

  /**
   * Delete a school
   * DELETE /api/v1/schools
   */
  deleteSchool: (schoolId: number): Promise<void> => {
    return del<void>(API_ENDPOINTS.SCHOOLS.BASE, {
      params: { schoolId },
    });
  },
};

export default schoolService;
