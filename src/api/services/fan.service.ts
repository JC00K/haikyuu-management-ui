import { get, post } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { FanDTO, CreateFanRequest } from "../../types/dto";

export const fanService = {
  /**
   * Get all fans
   * GET /api/v1/fans
   */
  getAll: (): Promise<FanDTO[]> => {
    return get<FanDTO[]>(API_ENDPOINTS.FANS.BASE);
  },

  /**
   * Get fan by ID
   * GET /api/v1/fans/{id}
   */

  getById: async (id: number): Promise<FanDTO> => {
    return get<FanDTO>(`/fans/${id}`);
  },

  /**
   * Create a new fan
   * POST /api/v1/fans
   */

  create: (fan: CreateFanRequest): Promise<FanDTO> => {
    return post<FanDTO, CreateFanRequest>(API_ENDPOINTS.FANS.BASE, fan);
  },
};

export default fanService;
