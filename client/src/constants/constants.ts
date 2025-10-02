
export const APP_CONFIG = {
  API_BASE_URL:
    process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api",
  MAX_VOTES_PER_IP: parseInt(process.env.REACT_APP_MAX_VOTES_PER_IP || "10"),
  POLLING_INTERVAL: 30000, 
  APP_NAME: process.env.REACT_APP_APP_NAME || "Система голосования за идеи",
} as const;


export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Ошибка сети. Проверьте подключение к интернету",
  SERVER_ERROR: "Ошибка сервера. Попробуйте позже",
  LOAD_IDEAS_ERROR: "Не удалось загрузить список идей",
  VOTE_ERROR: "Не удалось проголосовать",
  UNKNOWN_ERROR: "Произошла неизвестная ошибка",
} as const;


export const SUCCESS_MESSAGES = {
  VOTE_SUCCESS: "Голос успешно засчитан!",
} as const;
