import {
  Part,
  PartsResponse,
  PartResponse,
  AuthResponse,
  User,
  SavedDesign,
  DesignsResponse,
  Order,
  OrdersResponse,
  Favorite,
  FavoritesResponse,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Helper to get auth token
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
}

// Helper for fetch with auth
async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
    credentials: 'include',
  });
}

// ============ PARTS API ============

export async function fetchParts(category?: string): Promise<Part[]> {
  const url = category
    ? `${API_BASE_URL}/parts?category=${category}`
    : `${API_BASE_URL}/parts`;

  const response = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    next: { revalidate: 60 }, // Cache for 60 seconds
  });

  if (!response.ok) {
    throw new Error('Failed to fetch parts');
  }

  const data: PartsResponse = await response.json();
  return data.parts;
}

export async function fetchPartById(id: number): Promise<Part> {
  const response = await fetch(`${API_BASE_URL}/parts/${id}`, {
    headers: { 'Accept': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch part');
  }

  const data: PartResponse = await response.json();
  return data.part;
}

export async function fetchPartsByCategory(category: string): Promise<Part[]> {
  return fetchParts(category);
}

// ============ AUTH API ============

export async function register(name: string, email: string, password: string, passwordConfirmation: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Registration failed');
  }

  const data: AuthResponse = await response.json();

  // Store token
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', data.token);
  }

  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Login failed');
  }

  const data: AuthResponse = await response.json();

  // Store token
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', data.token);
  }

  return data;
}

export async function logout(): Promise<void> {
  const response = await fetchWithAuth(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
  });

  // Clear token regardless of response
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }

  if (!response.ok) {
    throw new Error('Logout failed');
  }
}

export async function getCurrentUser(): Promise<User | null> {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/user`);
    if (!response.ok) return null;

    const data = await response.json();
    return data.user;
  } catch {
    return null;
  }
}

// ============ SAVED DESIGNS API (My Garage) ============

export async function fetchDesigns(): Promise<SavedDesign[]> {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/designs`);

  if (!response.ok) {
    throw new Error('Failed to fetch designs');
  }

  const data: DesignsResponse = await response.json();
  return data.designs;
}

export async function saveDesign(
  name: string,
  configuration: SavedDesign['configuration'],
  thumbnailUrl?: string
): Promise<SavedDesign> {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/designs`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      configuration,
      thumbnail_url: thumbnailUrl,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save design');
  }

  const data = await response.json();
  return data.design;
}

export async function deleteDesign(id: number): Promise<void> {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/designs/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete design');
  }
}

// ============ ORDERS API ============

export async function fetchOrders(): Promise<Order[]> {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/orders`);

  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }

  const data: OrdersResponse = await response.json();
  return data.orders;
}

export async function checkout(
  items: { part_id: number; quantity: number }[],
  notes?: string
): Promise<Order> {
  const response = await fetchWithAuth(`${API_BASE_URL}/checkout`, {
    method: 'POST',
    body: JSON.stringify({ items, notes }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Checkout failed');
  }

  const data = await response.json();
  return data.order;
}

// ============ FAVORITES API ============

export async function fetchFavorites(): Promise<Favorite[]> {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/favorites`);

  if (!response.ok) {
    throw new Error('Failed to fetch favorites');
  }

  const data: FavoritesResponse = await response.json();
  return data.favorites;
}

export async function addToFavorites(partId: number): Promise<Favorite> {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/favorites`, {
    method: 'POST',
    body: JSON.stringify({ part_id: partId }),
  });

  if (!response.ok) {
    throw new Error('Failed to add to favorites');
  }

  const data = await response.json();
  return data.favorite;
}

export async function removeFromFavorites(id: number): Promise<void> {
  const response = await fetchWithAuth(`${API_BASE_URL}/user/favorites/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to remove from favorites');
  }
}

// ============ AI API ============

export interface AIRecommendationResponse {
  message: string;
  recommended_parts: Part[];
  model: string;
}

export interface AIQuizRequest {
  skill_level: 'beginner' | 'intermediate' | 'advanced';
  style: 'street' | 'park' | 'cruising' | 'all-around';
  budget?: 'low' | 'medium' | 'high';
}

export async function getAIRecommendation(message: string): Promise<AIRecommendationResponse> {
  const response = await fetch(`${API_BASE_URL}/ai/recommend`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'AI recommendation failed');
  }

  return response.json();
}

export async function getAIQuizRecommendation(quiz: AIQuizRequest): Promise<AIRecommendationResponse> {
  const response = await fetch(`${API_BASE_URL}/ai/quiz`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(quiz),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'AI quiz recommendation failed');
  }

  return response.json();
}
