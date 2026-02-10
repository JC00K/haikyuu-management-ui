import { get, post } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { AlumniDTO, CreateAlumniRequest } from "../../types/dto";

export const alumniService = {
  /**
   * Get all alumni
   * GET /api/v1/alumni
   */

  getAll: (): Promise<AlumniDTO[]> => {
    return get<AlumniDTO[]>(API_ENDPOINTS.ALUMNI.BASE);
  },

  /**
   * Get alumni by ID
   * GET /api/v1/alumni/{id}
   */

  getById: async (id: number): Promise<AlumniDTO> => {
    return get<AlumniDTO>(`/alumni/${id}`);
  },

  /**
   * Get all former players
   * GET /api/v1/alumni/former_players
   */

  getAllFormerPlayers: (): Promise<AlumniDTO[]> => {
    return get<AlumniDTO[]>(API_ENDPOINTS.ALUMNI.ALL_FORMER_PLAYERS);
  },

  /**
   * Get alumni by school ID
   * GET /api/v1/schools/{schoolId}/alumni
   */

  getBySchoolId: (schoolId: number): Promise<AlumniDTO[]> => {
    return get<AlumniDTO[]>(API_ENDPOINTS.ALUMNI.BY_SCHOOL_ID(schoolId));
  },

  /**
   * Create a new alumni
   * POST /api/v1/alumni
   */

  create: (alumni: CreateAlumniRequest): Promise<AlumniDTO> => {
    return post<AlumniDTO, CreateAlumniRequest>(
      API_ENDPOINTS.ALUMNI.BASE,
      alumni,
    );
  },
};

export default alumniService;
