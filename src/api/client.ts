import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import {
  API_CONFIG,
  API_HEADERS,
  API_ERROR_MESSAGES,
} from "../constants/api.constants";
import {
  ApiError,
  ApiErrorResponse,
  NetworkError,
  HttpStatus,
  isApiErrorResponse,
} from "../types/error.types";

/**
 * Create and configure Axios instance
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    timeout: API_CONFIG.TIMEOUT,
    headers: {
      "Content-Type": API_HEADERS.CONTENT_TYPE_JSON,
      Accept: API_HEADERS.ACCEPT_JSON,
    },
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add any auth tokens here if needed
      // const token = localStorage.getItem('auth_token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

      // Log requests in development
      if (import.meta.env.DEV) {
        console.log(
          `[API Request] ${config.method?.toUpperCase()} ${config.url}`,
          {
            params: config.params,
            data: config.data,
          },
        );
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      // Log responses in development
      if (import.meta.env.DEV) {
        console.log(
          `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
          {
            status: response.status,
            data: response.data,
          },
        );
      }

      return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
      return Promise.reject(handleApiError(error));
    },
  );

  return instance;
};

/**
 * Handle API errors and convert to custom error types
 */
const handleApiError = (error: AxiosError<ApiErrorResponse>): Error => {
  // Network error (no response)
  if (!error.response) {
    console.error("[API Error] Network error:", error.message);
    return new NetworkError(API_ERROR_MESSAGES.NETWORK_ERROR);
  }

  // Server returned error response
  const { status, data } = error.response;

  // Log error in development
  if (import.meta.env.DEV) {
    console.error(`[API Error] ${status}:`, data);
  }

  // Check if response matches ApiErrorResponse structure
  if (isApiErrorResponse(data)) {
    return new ApiError(data, status as HttpStatus);
  }

  // Fallback for unexpected error format
  return new ApiError(
    {
      apiPath: error.config?.url || "unknown",
      httpStatus: status as HttpStatus,
      message: error.message || API_ERROR_MESSAGES.UNKNOWN_ERROR,
      timeStamp: new Date().toISOString(),
      errors: [],
    },
    status as HttpStatus,
  );
};

/**
 * API Client singleton
 */
export const apiClient = createAxiosInstance();

/**
 * Generic request wrapper with type safety
 */
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.request(config);
  return response.data;
};

/**
 * GET request helper
 */
export const get = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return apiRequest<T>({ ...config, method: "GET", url });
};

/**
 * POST request helper
 */
export const post = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return apiRequest<T>({ ...config, method: "POST", url, data });
};

/**
 * PUT request helper
 */
export const put = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return apiRequest<T>({ ...config, method: "PUT", url, data });
};

/**
 * PATCH request helper
 */
export const patch = <T, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return apiRequest<T>({ ...config, method: "PATCH", url, data });
};

/**
 * DELETE request helper
 */
export const del = <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
  return apiRequest<T>({ ...config, method: "DELETE", url });
};

/**
 * Export configured client as default
 */
export default apiClient;
