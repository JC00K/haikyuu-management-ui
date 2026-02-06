import { get, post } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { FanDTO, CreateFanRequest } from "../../types/dto";

export const fanService = {
  getAll: (): Promise<FanDTO[]> => {
    return get<FanDTO[]>(API_ENDPOINTS.FANS.BASE);
  },

  create: (fan: CreateFanRequest): Promise<FanDTO> => {
    return post<FanDTO, CreateFanRequest>(API_ENDPOINTS.FANS.BASE, fan);
  },
};

export default fanService;
