import { ApiResponse } from "../types";
import { APP_CONFIG } from "../utils/constants";


class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export const api = {
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${APP_CONFIG.API_BASE_URL}${endpoint}`);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error || `Ошибка HTTP! Статус: ${response.status}`;
      throw new ApiError(response.status, errorMessage);
    }

    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
      throw new ApiError(
        response.status,
        result.error || "Неизвестная ошибка API"
      );
    }

    return result.data as T;
  },

  async post<T>(endpoint: string, body?: unknown): Promise<T> {
    const response = await fetch(`${APP_CONFIG.API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      const errorMessage =
        errorData?.error || `Ошибка HTTP! Статус: ${response.status}`;
      throw new ApiError(response.status, errorMessage);
    }

    const result: ApiResponse<T> = await response.json();

    if (!result.success) {
      throw new ApiError(
        response.status,
        result.error || "Неизвестная ошибка API"
      );
    }

    return result.data as T;
  },
};


export { ApiError };
