/**
 * API Base Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
  VERSION: import.meta.env.VITE_API_VERSION || "v1",
  TIMEOUT: 30000, // 30 seconds
} as const;

/**
 * API Endpoints
 * Organized by resource type matching Spring Boot controllers
 */
export const API_ENDPOINTS = {
  // Character endpoints
  CHARACTERS: {
    BASE: "/v1/characters",
    BY_ID: (id: number) => `/v1/characters/id/${id}`,
    BY_AGE: (age: number) => `/v1/characters/age/${age}`,
    BY_YEAR: (year: string) => `/v1/characters/year/${year}`,
    BY_ROLE: (role: string) => `/v1/characters/roles/${role}`,
    BY_SCHOOL: (school: string) => `/${school}/characters`,
    HEIGHT_GREATER_THAN: (height: number) =>
      `/v1/characters/greater_than_${height}`,
    HEIGHT_LESS_THAN: (height: number) => `/v1/characters/less_than_${height}`,
    SEARCH_BY_YEAR_AND_ROLE: "/v1/characters/search/role",
    ASSIGN_YEAR: (id: number) => `/v1/characters/assign_year/${id}`,
    ASSIGN_SCHOOL: (id: number) => `/v1/characters/assign_school/${id}`,
    ASSIGN_AGE: (id: number) => `/v1/characters/assign_age/${id}`,
  },

  // Player endpoints
  PLAYERS: {
    BASE: "/v1/players",
    BY_POSITION: (position: string) => `/v1/players/position/${position}`,
    BY_JERSEY_NUMBER: (jerseyNumber: number) =>
      `/v1/players/jersey_number/${jerseyNumber}`,
    BY_YEAR_AND_POSITION: (year: string, position: string) =>
      `/v1/players/find_by_year_and_position/${year}_${position}`,
    HEIGHT_GREATER_THAN: (height: number) =>
      `/v1/players/find_by_height_greater_than/${height}`,
    HEIGHT_LESS_THAN: (height: number) =>
      `/v1/players/find_by_height_less_than/${height}`,
  },

  // Coach endpoints
  COACHES: {
    BASE: "/v1/coaches",
  },

  // Management endpoints
  MANAGEMENT: {
    BASE: "/v1/management",
    BY_SCHOOL_ID: (schoolId: number) =>
      `/v1/management/get_by_school_id/${schoolId}`,
    BY_ROLE: (role: string) => `/v1/management/get_by_management_role/${role}`,
  },

  // Fan endpoints
  FANS: {
    BASE: "/v1/fans",
  },

  // Alumni endpoints
  ALUMNI: {
    BASE: "/alumni",
    ALL_FORMER_PLAYERS: "/alumni/all_former_players",
    BY_SCHOOL_ID: (schoolId: number) => `/alumni/get_by_school_id/${schoolId}`,
  },

  // Roster endpoints
  ROSTERS: {
    BY_ID: (rosterId: number) => `/v1/roster/get_roster_by_id/${rosterId}`,
    PLAYERS: (rosterId: number) => `/v1/roster/${rosterId}/get_players`,
    COACHES: (rosterId: number) => `/v1/roster/${rosterId}/get_coaches`,
    MANAGEMENT: (rosterId: number) => `/v1/roster/${rosterId}/get_management`,
    PLAYERS_BY_POSITION: (rosterId: number, position: string) =>
      `/v1/roster/${rosterId}/get_players_by_position/${position}`,
    ADD_PLAYER: (rosterId: number, playerId: number) =>
      `/v1/roster/${rosterId}/add_player_to_roster/${playerId}`,
    ADD_COACH: (rosterId: number, coachId: number) =>
      `/v1/roster/${rosterId}/add_coach_to_roster/${coachId}`,
    ADD_MANAGEMENT: (rosterId: number, managementId: number) =>
      `/v1/roster/${rosterId}/add_management_to_roster/${managementId}`,
    REMOVE_CHARACTER: (rosterId: number, characterId: number) =>
      `/v1/roster/${rosterId}/remove_character_from_roster/${characterId}`,
  },

  // School endpoints
  SCHOOLS: {
    BASE: "/v1/schools",
    LOOKUP: "/v1/schools", // For dropdown
    INFO: (schoolId: number) => `/v1/schools/${schoolId}/info`,
    CHARACTERS: (school: string) => `/v1/schools/${school}/characters`,
    BY_PREFECTURE: (prefecture: string) => `/v1/schools/${prefecture}`,
  },
} as const;

/**
 * HTTP Headers
 */
export const API_HEADERS = {
  CONTENT_TYPE_JSON: "application/json",
  ACCEPT_JSON: "application/json",
} as const;

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
} as const;

/**
 * API Error Messages
 */
export const API_ERROR_MESSAGES = {
  NETWORK_ERROR:
    "Unable to connect to the server. Please check your internet connection.",
  TIMEOUT_ERROR: "Request timed out. Please try again.",
  UNAUTHORIZED: "You are not authorized to perform this action.",
  FORBIDDEN: "Access to this resource is forbidden.",
  NOT_FOUND: "The requested resource was not found.",
  CONFLICT: "This resource already exists.",
  SERVER_ERROR: "An unexpected server error occurred. Please try again later.",
  VALIDATION_ERROR: "Please check your input and try again.",
  UNKNOWN_ERROR: "An unknown error occurred. Please try again.",
} as const;
