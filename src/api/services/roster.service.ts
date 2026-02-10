import { get, patch } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import { RosterDTO, PlayerDTO, CoachDTO, ManagementDTO } from "../../types/dto";
import { Position } from "../../types/enums";

export const rosterService = {
  /**
   * Get all rosters
   * GET /api/v1/rosters
   */

  getAll: async (): Promise<RosterDTO[]> => {
    return get<RosterDTO[]>(API_ENDPOINTS.ROSTERS.ALL());
  },

  /**
   * Get roster by ID
   * GET /api/v1/rosters/{rosterId}
   */

  getById: (rosterId: number): Promise<RosterDTO> => {
    return get<RosterDTO>(API_ENDPOINTS.ROSTERS.BY_ID(rosterId));
  },

  /**
   * Get players in a roster
   * GET /api/v1/rosters/{rosterId}/players
   */

  getPlayers: (rosterId: number): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(API_ENDPOINTS.ROSTERS.PLAYERS(rosterId));
  },

  /** Get coaches in a roster
   * GET /api/v1/rosters/{rosterId}/coaches
   */

  getCoaches: (rosterId: number): Promise<CoachDTO[]> => {
    return get<CoachDTO[]>(API_ENDPOINTS.ROSTERS.COACHES(rosterId));
  },

  /* Get management members in a roster
   * GET /api/v1/rosters/{rosterId}/management
   */

  getManagement: (rosterId: number): Promise<ManagementDTO[]> => {
    return get<ManagementDTO[]>(API_ENDPOINTS.ROSTERS.MANAGEMENT(rosterId));
  },

  /* Get players in a roster by position
   * GET /api/v1/rosters/{rosterId}/players/position/{position}
   */

  getPlayersByPosition: (
    rosterId: number,
    position: Position,
  ): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(
      API_ENDPOINTS.ROSTERS.PLAYERS_BY_POSITION(rosterId, position),
    );
  },

  /* Add a player to a roster
   * PATCH /api/v1/rosters/{rosterId}/add_player/{playerId}
   */

  addPlayer: (rosterId: number, playerId: number): Promise<RosterDTO> => {
    return patch<RosterDTO>(
      API_ENDPOINTS.ROSTERS.ADD_PLAYER(rosterId, playerId),
    );
  },

  /* Add a coach to a roster
   * PATCH /api/v1/rosters/{rosterId}/add_coach/{coachId}
   */

  addCoach: (rosterId: number, coachId: number): Promise<RosterDTO> => {
    return patch<RosterDTO>(API_ENDPOINTS.ROSTERS.ADD_COACH(rosterId, coachId));
  },

  /* Add a management member to a roster
   * PATCH /api/v1/rosters/{rosterId}/add_management/{managementId}
   */

  addManagement: (
    rosterId: number,
    managementId: number,
  ): Promise<RosterDTO> => {
    return patch<RosterDTO>(
      API_ENDPOINTS.ROSTERS.ADD_MANAGEMENT(rosterId, managementId),
    );
  },

  /* Remove a player from a roster
   * PATCH /api/v1/rosters/{rosterId}/remove_player/{playerId}
   */

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
