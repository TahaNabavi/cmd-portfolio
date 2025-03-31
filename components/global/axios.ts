// utils/api.ts
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

type ApiSuccessHandler<T> = (data: T, response: AxiosResponse<T>) => void;
type ApiErrorHandler = (error: AxiosError) => void;

interface ApiRequestConfig<T> extends AxiosRequestConfig {
  onSuccess?: ApiSuccessHandler<T>;
  onError?: ApiErrorHandler;
  headers?: Record<string, string>;
}

/**
 * Enhanced Axios wrapper with better TypeScript support and error handling
 * @param url The endpoint URL
 * @param config Configuration object including success/error handlers and axios config
 * @returns Promise with the response data
 */
export async function apiRequest<T>(
  url: string,
  config: ApiRequestConfig<T> = {}
): Promise<T | void> {
  const {
    onSuccess,
    onError,
    headers = {},
    ...axiosConfig
  } = config;

  try {
    const response: AxiosResponse<T> = await axios({
      url,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...axiosConfig,
    });

    if (onSuccess) {
      onSuccess(response.data, response);
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    // Default error handling
    const defaultErrorHandler = (err: AxiosError) => {
      if (err.response) {
        // Server responded with a status code outside 2xx
        console.error(
          `API Error [${err.response.status}]:`,
          err.response.data || err.message
        );
      } else if (err.request) {
        // Request was made but no response received
        console.error('API Error: No response received', err.request);
      } else {
        // Something happened in setting up the request
        console.error('API Error:', err.message);
      }
    };

    // Use custom error handler if provided, otherwise use default
    if (onError) {
      onError(axiosError);
    } else {
      defaultErrorHandler(axiosError);
    }

    // Re-throw the error to allow calling code to handle it
    // throw axiosError;
  }
}

/**
 * GET request helper
 */
export function apiGet<T>(
  url: string,
  config?: Omit<ApiRequestConfig<T>, 'method'>
): Promise<T | void> {
  return apiRequest<T>(url, { ...config, method: 'GET' });
}

/**
 * POST request helper
 */
export function apiPost<T>(
  url: string,
  data?: any,
  config?: Omit<ApiRequestConfig<T>, 'method' | 'data'>
): Promise<T | void> {
  return apiRequest<T>(url, { ...config, method: 'POST', data });
}
