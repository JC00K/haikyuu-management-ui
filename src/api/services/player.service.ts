import { get, post } from "../client";
import { API_ENDPOINTS } from "../../constants/api.constants";
import {
  PlayerDTO,
  CreatePlayerRequest,
  PlayerSearchParams,
} from "../../types/dto/player.types";
import { Position } from "../../types/enums/position.enum";
import { Year } from "../../types/enums/year.enum";

/**
 * Player Service
 * Handles all player-related API calls
 */
export const playerService = {
  /**
   * Get all players
   * GET /api/v1/players
   */
  getAllPlayers: (): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(API_ENDPOINTS.PLAYERS.BASE);
  },

  /**
   * Get player by ID
   * GET /api/v1/players/{id}
   */

  getById: async (id: number): Promise<PlayerDTO> => {
    return get<PlayerDTO>(`/v1/players/${id}`);
  },

  /**
   * Get players by position
   * GET /api/v1/players/position/{position}
   */
  getByPosition: (position: Position): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(API_ENDPOINTS.PLAYERS.BY_POSITION(position));
  },

  /**
   * Get players by jersey number
   * GET /api/v1/players/jersey_number/{jerseyNumber}
   */
  getByJerseyNumber: (jerseyNumber: number): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(
      API_ENDPOINTS.PLAYERS.BY_JERSEY_NUMBER(jerseyNumber),
    );
  },

  /**
   * Get players by year and position
   * GET /api/v1/players/find_by_year_and_position/{year}_{position}
   */
  getByYearAndPosition: (
    year: Year,
    position: Position,
  ): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(
      API_ENDPOINTS.PLAYERS.BY_YEAR_AND_POSITION(year, position),
    );
  },

  /**
   * Get players with height greater than specified value
   * GET /api/v1/players/find_by_height_greater_than/{height}
   */
  getByHeightGreaterThan: (height: number): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(API_ENDPOINTS.PLAYERS.HEIGHT_GREATER_THAN(height));
  },

  /**
   * Get players with height less than specified value
   * GET /api/v1/players/find_by_height_less_than/{height}
   */
  getByHeightLessThan: (height: number): Promise<PlayerDTO[]> => {
    return get<PlayerDTO[]>(API_ENDPOINTS.PLAYERS.HEIGHT_LESS_THAN(height));
  },

  /**
   * Create a new player
   * POST /api/v1/players
   */
  createPlayer: (player: CreatePlayerRequest): Promise<PlayerDTO> => {
    return post<PlayerDTO, CreatePlayerRequest>(
      API_ENDPOINTS.PLAYERS.BASE,
      player,
    );
  },

  /**
   * Search players (client-side filtering for now)
   * Can be extended with backend search endpoint if available
   */
  searchPlayers: async (params: PlayerSearchParams): Promise<PlayerDTO[]> => {
    const { year, position } = params;

    if (year && position) {
      return playerService.getByYearAndPosition(year, position);
    }

    if (position) {
      return playerService.getByPosition(position);
    }

    // If only year is specified, would need to filter client-side
    // or add a backend endpoint
    const allPlayers = await playerService.getAllPlayers();

    if (year) {
      return allPlayers.filter((p) => p.year === year);
    }

    return allPlayers;
  },
};

export default playerService;
