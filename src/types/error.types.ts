/**
 * HTTP Status codes returned by the API
 */
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * API Error Response
 * Maps to: com.example.haikyuuspring.controller.dto.error.ApiErrorResponse
 */
export interface ApiErrorResponse {
  apiPath: string;
  httpStatus: HttpStatus;
  message: string;
  timeStamp: string; // ISO datetime string from Java LocalDateTime
  errors: string[]; // List of validation error messages
}

/**
 * Type guard to check if error is ApiErrorResponse
 */
export const isApiErrorResponse = (
  error: unknown,
): error is ApiErrorResponse => {
  return (
    typeof error === "object" &&
    error !== null &&
    "apiPath" in error &&
    "httpStatus" in error &&
    "message" in error &&
    "timeStamp" in error &&
    "errors" in error
  );
};

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  constructor(
    public readonly response: ApiErrorResponse,
    public readonly status: HttpStatus,
  ) {
    super(response.message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  /**
   * Check if error is a specific HTTP status
   */
  isStatus(status: HttpStatus): boolean {
    return this.status === status;
  }

  /**
   * Check if error is NOT_FOUND (404)
   */
  isNotFound(): boolean {
    return this.status === HttpStatus.NOT_FOUND;
  }

  /**
   * Check if error is CONFLICT (409)
   */
  isConflict(): boolean {
    return this.status === HttpStatus.CONFLICT;
  }

  /**
   * Check if error is server error (500+)
   */
  isServerError(): boolean {
    return this.status >= 500;
  }

  /**
   * Check if error is client error (400-499)
   */
  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  /**
   * Get formatted timestamp
   */
  getFormattedTimestamp(): string {
    return new Date(this.response.timeStamp).toLocaleString();
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage(): string {
    // Customize messages based on status
    switch (this.status) {
      case HttpStatus.NOT_FOUND:
        return "The requested resource was not found.";
      case HttpStatus.CONFLICT:
        return "This resource already exists.";
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return "An unexpected error occurred. Please try again later.";
      default:
        return this.response.message;
    }
  }
}

/**
 * Network error (no response from server)
 */
export class NetworkError extends Error {
  constructor(message = "Network error. Please check your connection.") {
    super(message);
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * Validation error for form inputs
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Form validation errors
 */
export class FormValidationError extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super("Form validation failed");
    this.name = "FormValidationError";
    Object.setPrototypeOf(this, FormValidationError.prototype);
  }

  /**
   * Get error message for specific field
   */
  getFieldError(field: string): string | undefined {
    return this.errors.find((e) => e.field === field)?.message;
  }

  /**
   * Check if field has error
   */
  hasFieldError(field: string): boolean {
    return this.errors.some((e) => e.field === field);
  }
}
