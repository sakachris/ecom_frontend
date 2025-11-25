// src/components/products/ProductReviews.tsx
"use client";

import React from "react";
import StarRating from "@/components/common/StarRating";

type Review = {
  review_id: string;
  user_email?: string;
  rating: number;
  comment: string;
  created_at?: string;
};

export default function ProductReviews({ reviews }: { reviews: Review[] }) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">All Reviews</h3>
        <div>{/* sorting / write review UI could go here later */}</div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {reviews.length === 0 && (
          <div className="text-gray-500">No reviews yet.</div>
        )}

        {reviews.map((r) => (
          <article
            key={r.review_id}
            className="border rounded-xl p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{r.user_email ?? "Anonymous"}</div>
                <div className="text-xs text-gray-400">
                  {r.created_at
                    ? new Date(r.created_at).toLocaleDateString()
                    : ""}
                </div>
              </div>
              <div>
                <StarRating rating={r.rating} size={12} />
              </div>
            </div>

            <p className="mt-3 text-gray-700">{r.comment}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
