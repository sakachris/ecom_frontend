// src/components/products/ProductTabs.tsx
"use client";

import React, { useState } from "react";
import ProductReviews from "./ProductReviews";
import ClientDate from "@/components/common/ClientDate";

type Props = {
  product: {
    product_id: string;
    name: string;
    description: string;
    price: string;
    created_at?: string;
    category_name?: string;
  };
  reviews: {
    review_id: string;
    user_first_name?: string;
    user_last_name?: string;
    rating: number;
    comment: string;
    created_at?: string;
  }[];
};

export default function ProductTabs({ product, reviews }: Props) {
  const [tab, setTab] = useState<"details" | "reviews">("details");

  return (
    <div>
      {/* Tab headers */}
      <div className="border-b flex gap-8">
        <button
          onClick={() => setTab("details")}
          className={`pb-3 ${
            tab === "details"
              ? "border-b-2 border-black font-medium"
              : "text-gray-600"
          }`}
        >
          Product Details
        </button>

        <button
          onClick={() => setTab("reviews")}
          className={`pb-3 ${
            tab === "reviews"
              ? "border-b-2 border-black font-medium"
              : "text-gray-600"
          }`}
        >
          Rating & Reviews
        </button>
      </div>

      {/* Tab panels */}
      <div className="mt-6">
        {tab === "details" && (
          <section className="prose max-w-none">
            <p>{product.description}</p>
            <ul className="mt-4 text-sm text-gray-700">
              <li>SKU: {product.product_id}</li>
              <li>Category: {product.category_name}</li>
              <li>
                Added: <ClientDate value={product.created_at ?? ""} />
              </li>
            </ul>
          </section>
        )}

        {tab === "reviews" && (
          <section>
            <ProductReviews reviews={reviews} />
          </section>
        )}
      </div>
    </div>
  );
}
