// src/lib/types.ts
export interface Product {
  product_id: string;
  name: string;
  price: string;
  category: string;
  category_name: string;
  primary_image: string;
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
}
