import { get, patch } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { RosterDTO, PlayerDTO, CoachDTO, ManagementDTO } from "../../types/dto";
import { Position } from "../../types/enums";

export const rosterService = {
  getById: (rosterId: number): Promise<RosterDTO> => {
    return get<RosterDTO>(API_ENDPOINTS.ROSTERS.BY_ID(rosterId));
  },

  getPlayers: (rosterId: number): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(API_ENDPOINTS.ROSTERS.PLAYERS(rosterId));
  },

  getCoaches: (rosterId: number): Promise<CoachDTO[]> => {
    return get<CoachDTO[]>(API_ENDPOINTS.ROSTERS.COACHES(rosterId));
  },

  getManagement: (rosterId: number): Promise<ManagementDTO[]> => {
    return get<ManagementDTO[]>(API_ENDPOINTS.ROSTERS.MANAGEMENT(rosterId));
  },

  getPlayersByPosition: (
    rosterId: number,
    position: Position,
  ): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(
      API_ENDPOINTS.ROSTERS.PLAYERS_BY_POSITION(rosterId, position),
    );
  },

  addPlayer: (rosterId: number, playerId: number): Promise<RosterDTO> => {
    return patch<RosterDTO>(
      API_ENDPOINTS.ROSTERS.ADD_PLAYER(rosterId, playerId),
    );
  },

  addCoach: (rosterId: number, coachId: number): Promise<RosterDTO> => {
    return patch<RosterDTO>(API_ENDPOINTS.ROSTERS.ADD_COACH(rosterId, coachId));
  },

  addManagement: (
    rosterId: number,
    managementId: number,
  ): Promise<RosterDTO> => {
    return patch<RosterDTO>(
      API_ENDPOINTS.ROSTERS.ADD_MANAGEMENT(rosterId, managementId),
    );
  },

  removeCharacter: (
    rosterId: number,
    characterId: number,
  ): Promise<RosterDTO> => {
    return patch<RosterDTO>(
      API_ENDPOINTS.ROSTERS.REMOVE_CHARACTER(rosterId, characterId),
    );
  },
};

export default rosterService;
