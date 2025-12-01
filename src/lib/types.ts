// src/lib/types.ts
export interface Product {
  product_id: string;
  name: string;
  price: string;
  category: string;
  category_name: string;
  primary_image: string;
  average_rating: number;
  reviews_count: number;
}

export interface Meta {
  page: number;
  pages: number;
  total_count: number;
  page_count: number;
  first_page: string | null;
  last_page: string | null;
  next: string | null;
  previous: string | null;
}

export interface ProductsResponse {
  meta: Meta;
  results: Product[];
}

export interface Category {
  category_id: string;
  name: string;
  description?: string;
  basePath?: string;
}

export interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | undefined>>;
}

export interface ProductDetailProps {
  params: {
    id: string;
  };
}

export interface ProductDetailResponse {
  product_id: string;
  name: string;
  description: string;
  price: string;
  stock_quantity: number;
  category_name?: string;
  average_rating?: number;
  reviews_count?: number;
  created_at?: string;
}

export interface ProductImage {
  image_id: string;
  image: string;
  is_primary: boolean;
}

export interface Review {
  review_id: string;
  user_first_name?: string;
  user_last_name?: string;
  rating: number;
  comment: string;
  created_at?: string;
}

export interface ClientDateProps {
  value: string;
}

export interface StarRatingProps {
  rating: number;
  size?: number;
}

export interface ApiCategory {
  category_id: string;
  name: string;
}

export interface TokenResponse {
  access: string;
  refresh?: string;
  first_name?: string;
  last_name?: string;
}
