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

export interface ApiErrorResponse {
  apiPath: string;
  httpStatus: HttpStatus;
  message: string;
  timeStamp: string;
  errors: string[];
}

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

export class ApiError extends Error {
  constructor(
    public readonly response: ApiErrorResponse,
    public readonly status: HttpStatus,
  ) {
    super(response.message);
    this.name = "ApiError";
    Object.setPrototypeOf(this, ApiError.prototype);
  }

  isStatus(status: HttpStatus): boolean {
    return this.status === status;
  }

  isNotFound(): boolean {
    return this.status === HttpStatus.NOT_FOUND;
  }

  isConflict(): boolean {
    return this.status === HttpStatus.CONFLICT;
  }

  isServerError(): boolean {
    return this.status >= 500;
  }

  isClientError(): boolean {
    return this.status >= 400 && this.status < 500;
  }

  getFormattedTimestamp(): string {
    return new Date(this.response.timeStamp).toLocaleString();
  }

  getUserMessage(): string {
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

export class NetworkError extends Error {
  constructor(message = "Network error. Please check your connection.") {
    super(message);
    this.name = "NetworkError";
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export interface ValidationError {
  field: string;
  message: string;
}

export class FormValidationError extends Error {
  constructor(public readonly errors: ValidationError[]) {
    super("Form validation failed");
    this.name = "FormValidationError";
    Object.setPrototypeOf(this, FormValidationError.prototype);
  }

  getFieldError(field: string): string | undefined {
    return this.errors.find((e) => e.field === field)?.message;
  }

  hasFieldError(field: string): boolean {
    return this.errors.some((e) => e.field === field);
  }
}
