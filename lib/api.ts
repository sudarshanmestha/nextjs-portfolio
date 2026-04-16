// Ensure the fallback URL has no trailing slash to prevent // errors
const NEXT_PUBLIC_API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001').replace(/\/$/, '');

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password1: string;
  password2: string;
  first_name?: string;
  last_name?: string;
}

class ApiClient {
  private baseURL: string = NEXT_PUBLIC_API_URL;

  constructor() {
    if (typeof window !== 'undefined') {
      console.log("🚀 Reintenspark API initialized with:", this.baseURL);
    }
  }

  private getAuthHeader(): Record<string, string> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
    return {};
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    // This logic ensures we always have exactly one slash between baseURL and endpoint
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${cleanEndpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...this.getAuthHeader(),
      ...(options.headers as Record<string, string>),
    };

    let response = await fetch(url, { ...options, headers });

    // Handle Token Refresh logic
    if (response.status === 401 && !endpoint.includes('login') && !endpoint.includes('token/refresh')) {
      const newAccessToken = await this.refreshToken();
      if (newAccessToken) {
        const retryHeaders = { ...headers, 'Authorization': `Bearer ${newAccessToken}` };
        response = await fetch(url, { ...options, headers: retryHeaders });
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || JSON.stringify(error) || 'An error occurred');
    }

    return response.status === 204 ? {} as T : response.json();
  }

  // --- PASSWORD MANAGEMENT ---

  async changePassword(data: any) {
    return this.request('/api/auth/password/change/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async requestPasswordReset(email: string) {
    return this.request('/api/auth/password/reset/', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async confirmPasswordReset(data: any) {
    return this.request('/api/auth/password/reset/confirm/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // --- AUTH FLOW ---

  async login(data: LoginData) {
    const res = await this.request<any>('/api/auth/login/', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    });
    localStorage.setItem('access_token', res.access);
    localStorage.setItem('refresh_token', res.refresh);
    return res;
  }

  async register(data: RegisterData) {
    return this.request<any>('/api/auth/registration/', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    });
  }

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }

  // --- USER PROFILE ---

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/auth/user/', { method: 'GET' });
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.request<User>('/api/auth/user/', { 
      method: 'PATCH', 
      body: JSON.stringify(data) 
    });
  }

  // --- TOKEN LOGIC ---

  async refreshToken(): Promise<string | null> {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) return null;
    
    const refreshUrl = `${this.baseURL}/api/auth/token/refresh/`;
    const res = await fetch(refreshUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });
    
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('access_token', data.access);
      return data.access;
    }
    return null;
  }
}

export const api = new ApiClient();