// Backend URL configuration
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Helper function to construct API endpoints
export const getApiUrl = (endpoint: string) => {
  return `${BACKEND_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
}; 