// src/components/products/FilterWrapper.tsx

"use client";
import { useState } from "react";
import type { Category } from "@/lib/types";
import ProductFilterSidebar from "@/components/products/ProductFilterSidebar";

export default function FiltersWrapper({
  categories,
  basePath = "/",
}: {
  categories: Category[];
  basePath: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900 transition"
        >
          Product Filters
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <ProductFilterSidebar categories={categories} basePath={basePath} />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div>
          {/* Overlay */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            onKeyDown={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 z-40"
          />

          {/* Drawer panel */}
          <div
            className="
              fixed
              top-0
              left-0
              h-full
              w-72
              bg-white
              shadow-lg
              z-50
              p-4
              transform
              animate-slideIn
            "
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Filters</h3>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-black transition text-sm"
              >
                Close ✕
              </button>
            </div>
            <ProductFilterSidebar
              categories={categories}
              basePath={basePath}
              onApplied={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
