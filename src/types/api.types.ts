import { ApiErrorResponse } from "./error.types";

/**
 * Generic API Response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

/**
 * API Request configuration
 */
export interface ApiRequestConfig {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  url: string;
  data?: unknown;
  params?: Record<string, string | number | boolean | undefined>;
  headers?: Record<string, string>;
}

/**
 * Pagination params (for future use)
 */
export interface PaginationParams {
  page: number;
  size: number;
  sort?: string;
  order?: "asc" | "desc";
}

/**
 * Paginated response (for future use)
 */
export interface PaginatedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
}

/**
 * API Success Response
 */
export type ApiSuccessResponse<T> = ApiResponse<T>;

/**
 * API Error Response (from backend)
 */
export type ApiErrorResponseType = ApiErrorResponse;

/**
 * Query key factory for React Query
 */
export const queryKeys = {
  // Characters
  characters: {
    all: ["characters"] as const,
    lists: () => [...queryKeys.characters.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.characters.lists(), { filters }] as const,
    details: () => [...queryKeys.characters.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.characters.details(), id] as const,
    byAge: (age: number) => [...queryKeys.characters.all, "age", age] as const,
    byYear: (year: string) =>
      [...queryKeys.characters.all, "year", year] as const,
    byRole: (role: string) =>
      [...queryKeys.characters.all, "role", role] as const,
    bySchool: (school: string) =>
      [...queryKeys.characters.all, "school", school] as const,
  },

  // Players
  players: {
    all: ["players"] as const,
    lists: () => [...queryKeys.players.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.players.lists(), { filters }] as const,
    details: () => [...queryKeys.players.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.players.details(), id] as const,
    byPosition: (position: string) =>
      [...queryKeys.players.all, "position", position] as const,
    byJerseyNumber: (number: number) =>
      [...queryKeys.players.all, "jersey", number] as const,
  },

  // Coaches
  coaches: {
    all: ["coaches"] as const,
    lists: () => [...queryKeys.coaches.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.coaches.lists(), { filters }] as const,
    details: () => [...queryKeys.coaches.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.coaches.details(), id] as const,
  },

  // Management
  management: {
    all: ["management"] as const,
    lists: () => [...queryKeys.management.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.management.lists(), { filters }] as const,
    details: () => [...queryKeys.management.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.management.details(), id] as const,
    bySchool: (schoolId: number) =>
      [...queryKeys.management.all, "school", schoolId] as const,
    byRole: (role: string) =>
      [...queryKeys.management.all, "role", role] as const,
  },

  // Fans
  fans: {
    all: ["fans"] as const,
    lists: () => [...queryKeys.fans.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.fans.lists(), { filters }] as const,
  },

  // Alumni
  alumni: {
    all: ["alumni"] as const,
    lists: () => [...queryKeys.alumni.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.alumni.lists(), { filters }] as const,
    formerPlayers: () => [...queryKeys.alumni.all, "formerPlayers"] as const,
    bySchool: (schoolId: number) =>
      [...queryKeys.alumni.all, "school", schoolId] as const,
  },

  // Rosters
  rosters: {
    all: ["rosters"] as const,
    details: () => [...queryKeys.rosters.all, "detail"] as const,
    detail: (rosterId: number) =>
      [...queryKeys.rosters.details(), rosterId] as const,
    players: (rosterId: number) =>
      [...queryKeys.rosters.detail(rosterId), "players"] as const,
    coaches: (rosterId: number) =>
      [...queryKeys.rosters.detail(rosterId), "coaches"] as const,
    management: (rosterId: number) =>
      [...queryKeys.rosters.detail(rosterId), "management"] as const,
    playersByPosition: (rosterId: number, position: string) =>
      [...queryKeys.rosters.detail(rosterId), "players", position] as const,
  },

  // Schools
  schools: {
    all: ["schools"] as const,
    lists: () => [...queryKeys.schools.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.schools.lists(), { filters }] as const,
    details: () => [...queryKeys.schools.all, "detail"] as const,
    detail: (id: number) => [...queryKeys.schools.details(), id] as const,
    lookup: () => [...queryKeys.schools.all, "lookup"] as const,
    info: (schoolId: number) =>
      [...queryKeys.schools.detail(schoolId), "info"] as const,
    characters: (school: string) =>
      [...queryKeys.schools.all, school, "characters"] as const,
    byPrefecture: (prefecture: string) =>
      [...queryKeys.schools.all, "prefecture", prefecture] as const,
  },
} as const;
