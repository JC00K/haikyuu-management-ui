import { get, post } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { ManagementDTO, CreateManagementRequest } from "../../types/dto";
import { ManagementRole } from "../../types/enums";

export const managementService = {
  /**
   * Get all management members
   * GET /api/v1/management
   */

  getAll: (): Promise<ManagementDTO[]> => {
    return get<ManagementDTO[]>(API_ENDPOINTS.MANAGEMENT.BASE);
  },

  /**
   * Get management member by ID
   * GET /api/v1/management/{id}
   */

  getById: async (id: number): Promise<ManagementDTO> => {
    return get<ManagementDTO>(`/management/${id}`);
  },

  /**
   * Get management members by school ID
   * GET /api/v1/schools/{schoolId}/management
   */

  getBySchoolId: (schoolId: number): Promise<ManagementDTO[]> => {
    return get<ManagementDTO[]>(
      API_ENDPOINTS.MANAGEMENT.BY_SCHOOL_ID(schoolId),
    );
  },

  /**
   * Get management members by role
   * GET /api/v1/management/roles/{role}
   */

  getByRole: (role: ManagementRole): Promise<ManagementDTO[]> => {
    return get<ManagementDTO[]>(API_ENDPOINTS.MANAGEMENT.BY_ROLE(role));
  },

  /**
   * Create a new management member
   * POST /api/v1/management
   */

  create: (management: CreateManagementRequest): Promise<ManagementDTO> => {
    return post<ManagementDTO, CreateManagementRequest>(
      API_ENDPOINTS.MANAGEMENT.BASE,
      management,
    );
  },
};

export default managementService;
