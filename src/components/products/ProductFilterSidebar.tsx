// src/components/products/ProductFilterSidebar.tsx
"use client";

import { Category } from "@/lib/types";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ProductFilterSidebar({
  categories,
  basePath,
  onApplied,
}: {
  categories: Category[];
  basePath: string;
  onApplied?: () => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [minPrice, setMinPrice] = useState(
    searchParams.get("price__gte") ?? ""
  );
  const [maxPrice, setMaxPrice] = useState(
    searchParams.get("price__lte") ?? ""
  );
  const [minRating, setMinRating] = useState(
    searchParams.get("average_rating__gte") ?? ""
  );

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Category
    if (category) params.set("category", category);
    else params.delete("category");

    // Min price
    if (minPrice) params.set("price__gte", minPrice);
    else params.delete("price__gte");

    // Max price
    if (maxPrice) params.set("price__lte", maxPrice);
    else params.delete("price__lte");

    // Min rating
    if (minRating) params.set("average_rating__gte", minRating);
    else params.delete("average_rating__gte");

    // Reset pagination
    params.set("page", "1");

    // router.push(`/?${params.toString()}`);
    router.push(`${basePath}?${params.toString()}`);
    if (onApplied) onApplied();
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("price__gte");
    params.delete("price__lte");
    params.delete("average_rating__gte");
    params.set("page", "1");
    // router.push(`/?${params.toString()}`);
    router.push(`${basePath}?${params.toString()}`);
    if (onApplied) onApplied();

    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
  };

  return (
    <aside className="w-full md:w-72">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        {/* Category Filter */}
        {pathname === "/" && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Category</h4>
            <select
              className="w-full rounded border px-2 py-1"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c.category_id} value={c.category_id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Price Range */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Price</h4>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 rounded border px-2 py-1"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 rounded border px-2 py-1"
            />
          </div>
        </div>

        {/* Rating Filter */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Minimum Rating</h4>

          <select
            className="w-full rounded border px-2 py-1"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="1">1 ★ & up</option>
            <option value="2">2 ★ & up</option>
            <option value="3">3 ★ & up</option>
            <option value="4">4 ★ & up</option>
            <option value="5">5 ★</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            type="button"
            onClick={() => {
              applyFilters();
              if (onApplied) onApplied(); // auto-close
            }}
            // onClick={applyFilters}
            className="bg-black text-white w-full rounded py-2"
          >
            Apply Filters
          </button>

          <button
            // onClick={resetFilters}
            type="button"
            onClick={() => {
              resetFilters();
              if (onApplied) onApplied(); // auto-close
            }}
            className="bg-gray-100 border rounded w-full py-2"
          >
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
}
