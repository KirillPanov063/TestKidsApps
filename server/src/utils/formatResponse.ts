export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  statusCode?: number; 
}

export class FormatResponse {
  static success<T = unknown>(data: T, message?: string): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  static error(
    error: string,
    statusCode: number,
    message?: string
  ): ApiResponse<null> {
    return {
      success: false,
      error,
      message,
      statusCode, 
      timestamp: new Date().toISOString(),
    };
  }

  static created<T = unknown>(
    data: T,
    message: string = "Ресурс успешно создан"
  ): ApiResponse<T> {
    return {
      success: true,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  static notFound(message: string = "Ресурс не найден"): ApiResponse<null> {
    return {
      success: false,
      error: "Не найдено",
      message,
      statusCode: 404, 
      timestamp: new Date().toISOString(),
    };
  }

  static conflict(message: string): ApiResponse<null> {
    return {
      success: false,
      error: "Конфликт",
      message,
      statusCode: 409, 
      timestamp: new Date().toISOString(),
    };
  }

  static badRequest(message: string): ApiResponse<null> {
    return {
      success: false,
      error: "Неверный запрос",
      message,
      statusCode: 400, 
      timestamp: new Date().toISOString(),
    };
  }

  static internalError(
    message: string = "Внутренняя ошибка сервера"
  ): ApiResponse<null> {
    return {
      success: false,
      error: "Внутренняя ошибка",
      message,
      statusCode: 500, 
      timestamp: new Date().toISOString(),
    };
  }
}
