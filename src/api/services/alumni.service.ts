import { get, post } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { AlumniDTO, CreateAlumniRequest } from "../../types/dto";

export const alumniService = {
  getAll: (): Promise<AlumniDTO[]> => {
    return get<AlumniDTO[]>(API_ENDPOINTS.ALUMNI.BASE);
  },

  getAllFormerPlayers: (): Promise<AlumniDTO[]> => {
    return get<AlumniDTO[]>(API_ENDPOINTS.ALUMNI.ALL_FORMER_PLAYERS);
  },

  getBySchoolId: (schoolId: number): Promise<AlumniDTO[]> => {
    return get<AlumniDTO[]>(API_ENDPOINTS.ALUMNI.BY_SCHOOL_ID(schoolId));
  },

  create: (alumni: CreateAlumniRequest): Promise<AlumniDTO> => {
    return post<AlumniDTO, CreateAlumniRequest>(
      API_ENDPOINTS.ALUMNI.BASE,
      alumni,
    );
  },
};

export default alumniService;
