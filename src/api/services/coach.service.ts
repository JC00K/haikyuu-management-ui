import { get, post } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { CoachDTO, CreateCoachRequest } from "../../types/dto";

export const coachService = {
  getAll: (): Promise<CoachDTO[]> => {
    return get<CoachDTO[]>(API_ENDPOINTS.COACHES.BASE);
  },

  create: (coach: CreateCoachRequest): Promise<CoachDTO> => {
    return post<CoachDTO, CreateCoachRequest>(
      API_ENDPOINTS.COACHES.BASE,
      coach,
    );
  },
};

export default coachService;
