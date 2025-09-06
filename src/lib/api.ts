const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (this.token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      };
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    const response = await this.request<{
      message: string;
      token: string;
      user: { id: string; email: string; name: string; role: string };
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  async getCurrentUser() {
    return this.request<{ user: { id: string; email: string; name: string; role: string } }>('/auth/me');
  }

  async verifyToken() {
    return this.request<{ valid: boolean; user: any }>('/auth/verify');
  }

  logout() {
    this.clearToken();
  }

  async changePassword(currentPassword: string, newPassword: string) {
    return this.request<{ message: string }>('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  async changeUsername(newName: string, currentPassword: string) {
    return this.request<{ 
      message: string; 
      user: { id: string; email: string; name: string; role: string } 
    }>('/auth/change-username', {
      method: 'PUT',
      body: JSON.stringify({ newName, currentPassword }),
    });
  }

  // Product endpoints
  async getProducts(params?: { category?: string; condition?: string; featured?: boolean }) {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.append('category', params.category);
    if (params?.condition) searchParams.append('condition', params.condition);
    if (params?.featured !== undefined) searchParams.append('featured', String(params.featured));
    
    const query = searchParams.toString();
    return this.request<any[]>(`/products${query ? `?${query}` : ''}`);
  }

  async getProduct(id: string) {
    return this.request<any>(`/products/${id}`);
  }

  async createProduct(productData: {
    title: string;
    description: string;
    price: string;
    image: string;
    images?: string[];
    category: string;
    condition: string;
    stock?: number;
    featured?: boolean;
  }) {
    return this.request<{ message: string; product: any }>('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id: string, productData: Partial<{
    title: string;
    description: string;
    price: string;
    image: string;
    images: string[];
    category: string;
    condition: string;
    stock: number;
    featured: boolean;
  }>) {
    return this.request<{ message: string; product: any }>(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: string) {
    return this.request<{ message: string }>(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Image endpoints
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${this.baseURL}/images/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(error.message || 'Upload failed');
    }

    return response.json();
  }

  async uploadMultipleImages(files: File[]) {
    const uploadPromises = files.map(file => this.uploadImage(file));
    return Promise.all(uploadPromises);
  }

  getImageUrl(imageId: string) {
    return `${this.baseURL}/images/${imageId}`;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
