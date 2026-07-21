// Ensure the fallback URL has no trailing slash to prevent // errors
const NEXT_PUBLIC_API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8001').replace(/\/$/, '');

// ── Auth Types ────────────────────────────────────────────────
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

// ── Course Types ──────────────────────────────────────────────
// These now mirror CategorySerializer / CourseListSerializer /
// CourseDetailSerializer / ChapterSerializer / LessonSerializer /
// VideoSerializer exactly (see serializers.py).

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Video {
  id: number;
  source_type: 'upload' | 'youtube' | string;
  file?: string | null;
  youtube_url?: string | null;
  embed_url?: string | null;
  duration_seconds?: number | null;
  file_size?: number | null;
  file_size_mb?: number | null;
  mime_type?: string | null;
  thumbnail?: string | null;
  uploaded_at?: string;
}

export interface Lesson {
  id: number;
  title: string;
  slug: string;
  duration_seconds: number;
  order: number;
  video?: Video | null;
  is_completed?: boolean;
}

export interface Chapter {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnail?: string;
  category: Category;
  difficulty: string;
  is_free: boolean;
  last_updated: string;
  total_lessons?: number;
  is_enrolled?: boolean;
  // Only present on the detail endpoint (GET /api/courses/:slug/)
  chapters?: Chapter[];
}

export interface Enrollment {
  id: number;
  course: Course;
  enrolled_at: string;
}

export interface LessonProgress {
  id: number;
  lesson: number;
  completed: boolean;
  updated_at: string;
}

export interface CourseProgress {
  total_lessons: number;
  completed_lessons: number;
  percent: number;
  lessons: LessonProgress[];
}

export interface LessonCompleteResponse {
  id: number;
  lesson: number;
  completed: boolean;
  updated_at: string;
}

// ── API Client ────────────────────────────────────────────────

class ApiClient {
  private baseURL: string = NEXT_PUBLIC_API_URL;

  constructor() {
    if (typeof window !== 'undefined') {
      console.log('🚀 API initialized with:', this.baseURL);
    }
  }

  private getAuthHeader(): Record<string, string> {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      return token ? { Authorization: `Bearer ${token}` } : {};
    }
    return {};
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${cleanEndpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...this.getAuthHeader(),
      ...(options.headers as Record<string, string>),
    };

    let response = await fetch(url, { ...options, headers });

    // Token refresh on 401
    if (
      response.status === 401 &&
      !endpoint.includes('login') &&
      !endpoint.includes('token/refresh')
    ) {
      const newToken = await this.refreshToken();
      if (newToken) {
        const retryHeaders = { ...headers, Authorization: `Bearer ${newToken}` };
        response = await fetch(url, { ...options, headers: retryHeaders });
      }
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || JSON.stringify(error) || 'An error occurred');
    }

    return response.status === 204 ? ({} as T) : response.json();
  }

  // ── Multipart request (for file uploads) ─────────────────────
  private async requestMultipart<T>(endpoint: string, formData: FormData): Promise<T> {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${this.baseURL}${cleanEndpoint}`;

    // Do NOT set Content-Type — browser sets it with correct boundary
    const headers: Record<string, string> = { ...this.getAuthHeader() };

    const response = await fetch(url, { method: 'POST', headers, body: formData });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || JSON.stringify(error) || 'Upload failed');
    }

    return response.json();
  }

  // ════════════════════════════════════════════════════════════
  // AUTH
  // ════════════════════════════════════════════════════════════

  async login(data: LoginData) {
    const res = await this.request<any>('/api/auth/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    localStorage.setItem('access_token', res.access);
    localStorage.setItem('refresh_token', res.refresh);
    return res;
  }

  async googleLogin(accessToken: string) {
    const res = await this.request<any>('/api/auth/google/', {
      method: 'POST',
      body: JSON.stringify({ access_token: accessToken }),
    });
    localStorage.setItem('access_token', res.access);
    localStorage.setItem('refresh_token', res.refresh);
    return res;
  }

  async register(data: RegisterData) {
    return this.request<any>('/api/auth/registration/', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  }

  // ── User ──────────────────────────────────────────────────────

  async getCurrentUser(): Promise<User> {
    return this.request<User>('/api/auth/user/', { method: 'GET' });
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    return this.request<User>('/api/auth/user/', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // ── Password ──────────────────────────────────────────────────

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

  // ── Token ─────────────────────────────────────────────────────

  async refreshToken(): Promise<string | null> {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) return null;

    const res = await fetch(`${this.baseURL}/api/auth/token/refresh/`, {
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

  // ════════════════════════════════════════════════════════════
  // COURSES
  // GET /api/courses/categories/
  // ════════════════════════════════════════════════════════════

  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/api/courses/categories/');
  }

  // ── GET /api/courses/ ─────────────────────────────────────────
  // Optional filters: ?category=slug or ?difficulty=level
  async getCourses(params?: { category?: string; difficulty?: string }): Promise<Course[]> {
    const qs = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : '';
    return this.request<Course[]>(`/api/courses/${qs}`);
  }

  // ── GET /api/courses/:slug/ ───────────────────────────────────
  async getCourse(slug: string): Promise<Course> {
    return this.request<Course>(`/api/courses/${slug}/`);
  }

  // ── POST /api/courses/:slug/enroll/ ──────────────────────────
  async enrollCourse(slug: string): Promise<{ detail: string }> {
    return this.request<{ detail: string }>(`/api/courses/${slug}/enroll/`, {
      method: 'POST',
    });
  }

  // ── GET /api/courses/my/enrollments/ ─────────────────────────
  async getMyEnrollments(): Promise<Enrollment[]> {
    return this.request<Enrollment[]>('/api/courses/my/enrollments/');
  }

  // ── GET /api/courses/progress/:slug/ ─────────────────────────
  async getCourseProgress(courseSlug: string): Promise<CourseProgress> {
    return this.request<CourseProgress>(`/api/courses/progress/${courseSlug}/`);
  }

  // ════════════════════════════════════════════════════════════
  // LESSONS
  // ════════════════════════════════════════════════════════════

  // ── GET /api/courses/:courseSlug/:lessonSlug/ ─────────────────
  async getLesson(courseSlug: string, lessonSlug: string): Promise<Lesson> {
    return this.request<Lesson>(`/api/courses/${courseSlug}/${lessonSlug}/`);
  }

  // ── POST /api/courses/:courseSlug/:lessonSlug/complete/ ───────
  async completeLesson(
    courseSlug: string,
    lessonSlug: string
  ): Promise<LessonCompleteResponse> {
    return this.request<LessonCompleteResponse>(
      `/api/courses/${courseSlug}/${lessonSlug}/complete/`,
      { method: 'POST' }
    );
  }

  // ════════════════════════════════════════════════════════════
  // VIDEOS
  // ════════════════════════════════════════════════════════════

  // ── GET /api/courses/:courseSlug/:lessonSlug/video/ ───────────
  async getVideo(courseSlug: string, lessonSlug: string): Promise<Video> {
    return this.request<Video>(`/api/courses/${courseSlug}/${lessonSlug}/video/`);
  }

  // ── DELETE /api/courses/:courseSlug/:lessonSlug/video/ ────────
  async deleteVideo(courseSlug: string, lessonSlug: string): Promise<void> {
    return this.request<void>(`/api/courses/${courseSlug}/${lessonSlug}/video/`, {
      method: 'DELETE',
    });
  }

  // ── POST /api/courses/:courseSlug/:lessonSlug/video/upload/ ───
  // Accepts a File object (multipart/form-data)
  async uploadVideo(courseSlug: string, lessonSlug: string, file: File): Promise<Video> {
    const formData = new FormData();
    formData.append('file', file);
    return this.requestMultipart<Video>(
      `/api/courses/${courseSlug}/${lessonSlug}/video/upload/`,
      formData
    );
  }

  // ── POST /api/courses/:courseSlug/:lessonSlug/video/youtube/ ──
  async attachYouTubeVideo(
    courseSlug: string,
    lessonSlug: string,
    youtubeUrl: string
  ): Promise<Video> {
    return this.request<Video>(
      `/api/courses/${courseSlug}/${lessonSlug}/video/youtube/`,
      {
        method: 'POST',
        body: JSON.stringify({ youtube_url: youtubeUrl }),
      }
    );
  }
}

export const api = new ApiClient();