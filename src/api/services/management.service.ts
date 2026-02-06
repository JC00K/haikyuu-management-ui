import { get, post } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { ManagementDTO, CreateManagementRequest } from "../../types/dto";
import { ManagementRole } from "../../types/enums";

export const managementService = {
  getAll: (): Promise<ManagementDTO[]> => {
    return get<ManagementDTO[]>(API_ENDPOINTS.MANAGEMENT.BASE);
  },

  getBySchoolId: (schoolId: number): Promise<ManagementDTO[]> => {
    return get<ManagementDTO[]>(
      API_ENDPOINTS.MANAGEMENT.BY_SCHOOL_ID(schoolId),
    );
  },

  getByRole: (role: ManagementRole): Promise<ManagementDTO[]> => {
    return get<ManagementDTO[]>(API_ENDPOINTS.MANAGEMENT.BY_ROLE(role));
  },

  create: (management: CreateManagementRequest): Promise<ManagementDTO> => {
    return post<ManagementDTO, CreateManagementRequest>(
      API_ENDPOINTS.MANAGEMENT.BASE,
      management,
    );
  },
};

export default managementService;
