// src/app/products/[id]/page.tsx
import React from "react";
import Header from "@/components/Header";
import ProductDetailGallery from "@/components/products/ProductDetailGallery";
import ProductSummary from "@/components/products/ProductSummary";
import ProductTabs from "@/components/products/ProductTabs";
import { buildUrl, fetchJson } from "@/lib/apiClient";
import { buildGalleryImages } from "@/lib/buildGalleryImages";
import {
  ProductDetailProps,
  ProductDetailResponse,
  ProductImage,
  Review,
} from "@/lib/types";
import Footer from "@/components/Footer";

const PRODUCTS_API = "/products/";
const PRODUCT_IMAGES_API = "/product-images/";
const REVIEWS_API = "/reviews/";

async function fetchProduct(id: string) {
  const url = buildUrl(`${PRODUCTS_API}${id}/`);
  return fetchJson<ProductDetailResponse>(url);
}

async function fetchProductImages(id: string) {
  const url = buildUrl(PRODUCT_IMAGES_API, {
    product: id,
    page: 1,
    page_size: 50,
  });
  const res = await fetchJson<{ results: ProductImage[] }>(url);
  return res.results ?? [];
}

async function fetchProductReviews(id: string) {
  const url = buildUrl(REVIEWS_API, { product: id, page: 1, page_size: 50 });
  const res = await fetchJson<{ results: Review[] }>(url);
  return res.results ?? [];
}

export default async function ProductPage({ params }: ProductDetailProps) {
  const { id } = await params; // app-router server components supply params as object

  // server fetch all required resources in parallel
  const [product, images, reviews] = await Promise.all([
    fetchProduct(id),
    fetchProductImages(id),
    fetchProductReviews(id),
  ]);

  const finalImages = buildGalleryImages(images, 4);
  const primaryImage =
    images.find((i) => i.is_primary)?.image ?? finalImages[0];

  return (
    <main>
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* top section: gallery (left) + product summary (right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7">
            <ProductDetailGallery images={finalImages} primary={primaryImage} />
          </div>
          <ProductSummary product={product} />
        </section>

        {/* Tabs: Product Details | Rating & Reviews */}
        <section className="mt-8">
          <ProductTabs product={product} reviews={reviews} />
        </section>
      </div>
      <Footer />
    </main>
  );
}
