import { PlayerDTO } from "./player.types";
import { CoachDTO } from "./coach.types";
import { ManagementDTO } from "./management.types";
import { Position } from "../enums/position.enum";

/**
 * Roster DTO
 * Maps to: com.example.haikyuuspring.controller.dto.RosterDTO
 *
 * Contains all members of a school's volleyball team
 */
export interface RosterDTO {
  /** List of players */
  players: PlayerDTO[];

  /** List of coaches */
  coaches: CoachDTO[];

  /** List of management members */
  management: ManagementDTO[];
}

/**
 * Extended Roster with ID (for when fetching specific roster)
 */
export interface RosterWithId extends RosterDTO {
  id: number;
  schoolId: number;
  schoolName: string;
  schoolColors?: string;
}

/**
 * Roster statistics
 */
export interface RosterStats {
  totalMembers: number;
  playerCount: number;
  coachCount: number;
  managementCount: number;
  positionDistribution: Record<Position, number>;
  averagePlayerHeight: number;
}

/**
 * Helper type for roster member operations
 */
export type RosterMember = PlayerDTO | CoachDTO | ManagementDTO;

/**
 * Type guard to check if member is a player
 */
export const isPlayer = (member: RosterMember): member is PlayerDTO => {
  return "position" in member && "jerseyNumber" in member;
};

/**
 * Type guard to check if member is a coach
 */
export const isCoach = (member: RosterMember): member is CoachDTO => {
  return "coachRole" in member && "coachingStyle" in member;
};

/**
 * Type guard to check if member is management
 */
export const isManagement = (member: RosterMember): member is ManagementDTO => {
  return "managementRole" in member;
};

/**
 * Roster operations (for API requests)
 */
export interface AddPlayerToRosterRequest {
  rosterId: number;
  playerId: number;
}

export interface AddCoachToRosterRequest {
  rosterId: number;
  coachId: number;
}

export interface AddManagementToRosterRequest {
  rosterId: number;
  managementId: number;
}

export interface RemoveCharacterFromRosterRequest {
  rosterId: number;
  characterId: number;
}
