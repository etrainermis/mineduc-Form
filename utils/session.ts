import { getToken, getRefreshToken, setToken, setRefreshToken, removeTokens, isTokenValid } from './token';

export interface UserSession {
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

class SessionManager {
  private static instance: SessionManager;
  private session: UserSession;

  private constructor() {
    this.session = {
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    };
    this.initialize();
  }

  public static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager();
    }
    return SessionManager.instance;
  }

  private initialize() {
    const token = getToken();
    const refreshToken = getRefreshToken();
    
    if (token && isTokenValid()) {
      this.session = {
        token,
        refreshToken,
        isAuthenticated: true,
        user: this.decodeToken(token),
      };
    }
  }

  private decodeToken(token: string) {
    try {
      // Split the token into parts
      const parts = token.split('.');
      if (parts.length !== 3) {
        console.error('Invalid token format');
        return undefined;
      }

      // Decode the payload (second part)
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      console.log('Decoded token payload:', payload);
      
      // Extract user information from the payload
      const roles = payload.roles || [];
      const role = roles.length > 0 ? roles[0].role_name : 'USER';
      
      return {
        id: payload.id,
        email: payload.email,
        role: role,
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      return undefined;
    }
  }

  public getSession(): UserSession {
    return this.session;
  }

  public async setSession(token: string, refreshToken?: string) {
    try {
      // Store tokens
      setToken(token);
      if (refreshToken) {
        setRefreshToken(refreshToken);
      }

      // Decode token and get user info
      const user = this.decodeToken(token);
      if (!user) {
        throw new Error('Invalid token format');
      }

      // Update session
      this.session = {
        token,
        refreshToken: refreshToken || this.session.refreshToken,
        isAuthenticated: true,
        user,
      };

      console.log('Session updated:', this.session);
    } catch (error) {
      console.error('Error setting session:', error);
      this.clearSession();
      throw error;
    }
  }

  public clearSession() {
    removeTokens();
    this.session = {
      token: null,
      refreshToken: null,
      isAuthenticated: false,
    };
  }

  public isAuthenticated(): boolean {
    const token = getToken();
    if (!token) return false;
    
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;
      
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      const expirationTime = payload.exp * 1000;
      return Date.now() < expirationTime;
    } catch (error) {
      return false;
    }
  }

  public getUser() {
    return this.session.user;
  }
}

export const sessionManager = SessionManager.getInstance(); 