import { Role } from "../enums/role.enum";
import { Year } from "../enums/year.enum";
import { Position } from "../enums/position.enum";

/**
 * Player DTO
 * Maps to: com.example.haikyuuspring.controller.dto.PlayerDTO
 * Extends CharacterDTO with player-specific fields
 */
export interface PlayerDTO {
  /** Player ID (read-only, assigned by backend) */
  readonly id?: number;

  /** Player name */
  name: string;

  /** Height in cm */
  height: number;

  /** Age */
  age: number;

  /** Year (student year) */
  year: Year;

  /** Role (should always be PLAYER) */
  role: Role;

  /** School ID */
  schoolId: number;

  /** School name (read-only, populated by backend) */
  readonly schoolName?: string;

  /** Image URL */
  imgUrl: string;

  /** Player position */
  position: Position;

  /** Jersey number */
  jerseyNumber: number;
}

/**
 * Create Player Request (omits read-only fields)
 */
export type CreatePlayerRequest = Omit<
  PlayerDTO,
  "id" | "schoolName" | "role"
> & {
  role?: Role.PLAYER; // Optional since it should always be PLAYER
};

/**
 * Update Player Request (partial with id required)
 */
export type UpdatePlayerRequest = Partial<CreatePlayerRequest> & { id: number };

/**
 * Player list item (for tables/cards)
 */
export type PlayerListItem = Required<PlayerDTO>;

/**
 * Player filters
 */
export interface PlayerFilters {
  position?: Position;
  jerseyNumber?: number;
  year?: Year;
  heightGreaterThan?: number;
  heightLessThan?: number;
  schoolId?: number;
}

/**
 * Player search params
 */
export interface PlayerSearchParams {
  year?: Year;
  position?: Position;
}

/**
 * Helper type for player by position grouping
 */
export interface PlayersByPosition {
  position: Position;
  players: PlayerDTO[];
}

/**
 * Helper type for player statistics
 */
export interface PlayerStats {
  totalPlayers: number;
  averageHeight: number;
  positionDistribution: Record<Position, number>;
  yearDistribution: Record<Year, number>;
}
