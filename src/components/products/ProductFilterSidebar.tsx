// src/components/products/ProductFilterSidebar.tsx
"use client";
import { useState, useEffect } from "react";
import { Category } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setPage } from "@/store/filtersSlice";
import { RootState } from "@/store/store";
import Button from "@/components/ui/Button";

export default function ProductFilterSidebar({
  categories,
  brands,
}: {
  categories: Category[];
  brands: string[];
}) {
  const dispatch = useDispatch();
  const filters = useSelector((s: RootState) => s.filters);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // collapse on mobile by default
    setOpen(false);
  }, []);

  return (
    <aside className="w-full md:w-72">
      <div className="md:block">
        <div className="md:sticky md:top-20 p-4 bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between md:hidden mb-3">
            <h3 className="font-medium">Filters</h3>
            <button
              onClick={() => setOpen((v) => !v)}
              className="px-2 py-1 border rounded"
            >
              {" "}
              {open ? "Close" : "Open"}{" "}
            </button>
          </div>

          <div className={`${open ? "block" : "hidden"} md:block`}>
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Category</h4>
              <select
                className="w-full rounded border px-2 py-1"
                value={filters.category ?? ""}
                onChange={(e) =>
                  dispatch(setFilter({ category: e.target.value || undefined }))
                }
              >
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c.category_id} value={c.category_id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Brand</h4>
              <select
                className="w-full rounded border px-2 py-1"
                value={filters.brand ?? ""}
                onChange={(e) =>
                  dispatch(setFilter({ brand: e.target.value || undefined }))
                }
              >
                <option value="">All</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Price</h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-1/2 rounded border px-2 py-1"
                  onBlur={(e) =>
                    dispatch(
                      setFilter({
                        min_price: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    )
                  }
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-1/2 rounded border px-2 py-1"
                  onBlur={(e) =>
                    dispatch(
                      setFilter({
                        max_price: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    )
                  }
                />
              </div>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Rating</h4>
              <select
                className="w-full rounded border px-2 py-1"
                value={String(filters.rating ?? "")}
                onChange={(e) =>
                  dispatch(
                    setFilter({
                      rating: e.target.value
                        ? Number(e.target.value)
                        : undefined,
                    })
                  )
                }
              >
                <option value="">All</option>
                <option value="4">4 & up</option>
                <option value="3">3 & up</option>
                <option value="2">2 & up</option>
              </select>
            </div>

            <div className="mt-3">
              <Button
                className="bg-black text-white w-full"
                onClick={() => {
                  dispatch(setFilter({}));
                  dispatch(setPage(1));
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
