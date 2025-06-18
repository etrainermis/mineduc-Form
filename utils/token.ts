export const TOKEN_KEY = 'access';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(TOKEN_KEY);
    console.log('Token:', TOKEN_KEY);
  }
  return null;
};

export const getRefreshToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return null;
};

export const setToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

export const setRefreshToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  }
};

export const removeTokens = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export const isTokenValid = (): boolean => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // Check if token is expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() < expirationTime;
  } catch (error) {
    console.error('Error checking token validity:', error);
    return false;
  }
};

export const refreshToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;

  try {
    const response = await fetch('http://197.243.26.64:3037/auth/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        setToken(data.token);
        if (data.refreshToken) {
          setRefreshToken(data.refreshToken);
        }
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return false;
  }
};

export const getValidToken = async (): Promise<string | null> => {
  const token = getToken();
  
  if (token && isTokenValid()) {
    return token;
  }

  // Try to refresh the token
  const refreshed = await refreshToken();
  if (refreshed) {
    return getToken();
  }

  // If refresh fails, clear tokens and return null
  removeTokens();
  return null;
}; 