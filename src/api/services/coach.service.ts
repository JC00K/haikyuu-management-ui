import { get, post } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { CoachDTO, CreateCoachRequest } from "../../types/dto";

export const coachService = {
  /**
   * Get all coaches
   * GET /api/v1/coaches
   */

  getAll: (): Promise<CoachDTO[]> => {
    return get<CoachDTO[]>(API_ENDPOINTS.COACHES.BASE);
  },

  /**
   * Get coach by ID
   * GET /api/v1/coaches/{id}
   */

  getById: async (id: number): Promise<CoachDTO> => {
    return get<CoachDTO>(`/coaches/${id}`);
  },

  /**
   * Create a new coach
   * POST /api/v1/coaches
   */

  create: (coach: CreateCoachRequest): Promise<CoachDTO> => {
    return post<CoachDTO, CreateCoachRequest>(
      API_ENDPOINTS.COACHES.BASE,
      coach,
    );
  },
};

export default coachService;
