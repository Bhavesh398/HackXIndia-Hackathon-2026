// FastAPI Backend Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "https://back-rcui.onrender.com",
  ENDPOINTS: {
    HEALTH: "/health",
    PREDICT: "/predict",
  },
  TIMEOUT: 30000, // 30 seconds
};
