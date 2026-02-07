// TypeScript types for Laravel API responses

export interface Part {
  id: number;
  name: string;
  category: 'deck' | 'wheel' | 'truck' | 'bolt';
  texture_url: string | null;
  model_3d_ref: string | null;
  price: number;
  stock: number;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface SavedDesign {
  id: number;
  user_id: number;
  name: string;
  configuration: DesignConfiguration;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface DesignConfiguration {
  deck_id: number;
  wheel_id: number;
  truck_id: number;
  bolt_id: number;
  deck_color?: string;
  wheel_color?: string;
}

export interface Order {
  id: number;
  user_id: number;
  total_price: number;
  items: OrderItem[];
  status: 'pending' | 'completed' | 'cancelled';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  part_id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface Favorite {
  id: number;
  user_id: number;
  part_id: number;
  part?: Part;
  created_at: string;
  updated_at: string;
}

// API Response wrappers
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  error?: string;
}

export interface PartsResponse {
  parts: Part[];
}

export interface PartResponse {
  part: Part;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

export interface DesignsResponse {
  designs: SavedDesign[];
}

export interface OrdersResponse {
  orders: Order[];
}

export interface FavoritesResponse {
  favorites: Favorite[];
}

// AI API types
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
