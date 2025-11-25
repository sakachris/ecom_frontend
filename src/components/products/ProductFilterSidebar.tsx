// src/components/products/ProductFilterSidebar.tsx
"use client";

import { Category } from "@/lib/types";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ProductFilterSidebar({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

    router.push(`/?${params.toString()}`);
  };

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    params.delete("price__gte");
    params.delete("price__lte");
    params.delete("average_rating__gte");
    params.set("page", "1");
    router.push(`/?${params.toString()}`);

    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setMinRating("");
  };

  return (
    <aside className="w-full md:w-72">
      <div className="p-4 bg-white rounded-lg shadow-sm">
        {/* Category Filter */}
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
            onClick={applyFilters}
            className="bg-black text-white w-full rounded py-2"
          >
            Apply Filters
          </button>

          <button
            onClick={resetFilters}
            className="bg-gray-100 border rounded w-full py-2"
          >
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
}

// // src/components/products/ProductFilterSidebar.tsx

// "use client";

// import { Category } from "@/lib/types";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";

// export default function ProductFilterSidebar({
//   categories,
// }: {
//   categories: Category[];
// }) {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const [category, setCategory] = useState(searchParams.get("category") ?? "");
//   const [minPrice, setMinPrice] = useState(
//     searchParams.get("price__gte") ?? ""
//   );
//   const [maxPrice, setMaxPrice] = useState(
//     searchParams.get("price__lte") ?? ""
//   );

//   const applyFilters = () => {
//     const params = new URLSearchParams(searchParams.toString());

//     // Category
//     if (category) params.set("category", category);
//     else params.delete("category");

//     // Min price
//     if (minPrice) params.set("price__gte", minPrice);
//     else params.delete("price__gte");

//     // Max price
//     if (maxPrice) params.set("price__lte", maxPrice);
//     else params.delete("price__lte");

//     // Reset pagination
//     params.set("page", "1");

//     router.push(`/?${params.toString()}`);
//   };

//   const resetFilters = () => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.delete("category");
//     params.delete("price__gte");
//     params.delete("price__lte");
//     params.set("page", "1");
//     router.push(`/?${params.toString()}`);

//     setCategory("");
//     setMinPrice("");
//     setMaxPrice("");
//   };

//   return (
//     <aside className="w-full md:w-72">
//       <div className="p-4 bg-white rounded-lg shadow-sm">
//         {/* Category Filter */}
//         <div className="mb-4">
//           <h4 className="text-sm font-semibold mb-2">Category</h4>
//           <select
//             className="w-full rounded border px-2 py-1"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option value="">All</option>
//             {categories.map((c) => (
//               <option key={c.category_id} value={c.category_id}>
//                 {c.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Price Range */}
//         <div className="mb-4">
//           <h4 className="text-sm font-semibold mb-2">Price</h4>

//           <div className="flex gap-2">
//             <input
//               type="number"
//               placeholder="Min"
//               value={minPrice}
//               onChange={(e) => setMinPrice(e.target.value)}
//               className="w-1/2 rounded border px-2 py-1"
//             />
//             <input
//               type="number"
//               placeholder="Max"
//               value={maxPrice}
//               onChange={(e) => setMaxPrice(e.target.value)}
//               className="w-1/2 rounded border px-2 py-1"
//             />
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex flex-col gap-2 mt-4">
//           <button
//             onClick={applyFilters}
//             className="bg-black text-white w-full rounded py-2"
//           >
//             Apply Filters
//           </button>

//           <button
//             onClick={resetFilters}
//             className="bg-gray-100 border rounded w-full py-2"
//           >
//             Reset
//           </button>
//         </div>
//       </div>
//     </aside>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { Category } from "@/lib/types";
// import { useDispatch, useSelector } from "react-redux";
// import { setFilter, setPage } from "@/store/filtersSlice";
// import { RootState } from "@/store/store";
// import Button from "@/components/ui/Button";

// export default function ProductFilterSidebar({
//   categories,
//   brands,
// }: {
//   categories: Category[];
//   brands: string[];
// }) {
//   const dispatch = useDispatch();
//   const filters = useSelector((s: RootState) => s.filters);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     // collapse on mobile by default
//     setOpen(false);
//   }, []);

//   return (
//     <aside className="w-full md:w-72">
//       <div className="md:block">
//         <div className="md:sticky md:top-20 p-4 bg-white rounded-lg shadow-sm">
//           <div className="flex items-center justify-between md:hidden mb-3">
//             <h3 className="font-medium">Filters</h3>
//             <button
//               onClick={() => setOpen((v) => !v)}
//               className="px-2 py-1 border rounded"
//             >
//               {" "}
//               {open ? "Close" : "Open"}{" "}
//             </button>
//           </div>

//           <div className={`${open ? "block" : "hidden"} md:block`}>
//             <div className="mb-4">
//               <h4 className="text-sm font-semibold mb-2">Category</h4>
//               <select
//                 className="w-full rounded border px-2 py-1"
//                 value={filters.category ?? ""}
//                 onChange={(e) =>
//                   dispatch(setFilter({ category: e.target.value || undefined }))
//                 }
//               >
//                 <option value="">All</option>
//                 {categories.map((c) => (
//                   <option key={c.category_id} value={c.category_id}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-4">
//               <h4 className="text-sm font-semibold mb-2">Brand</h4>
//               <select
//                 className="w-full rounded border px-2 py-1"
//                 value={filters.brand ?? ""}
//                 onChange={(e) =>
//                   dispatch(setFilter({ brand: e.target.value || undefined }))
//                 }
//               >
//                 <option value="">All</option>
//                 {brands.map((b) => (
//                   <option key={b} value={b}>
//                     {b}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="mb-4">
//               <h4 className="text-sm font-semibold mb-2">Price</h4>
//               <div className="flex gap-2">
//                 <input
//                   type="number"
//                   placeholder="Min"
//                   className="w-1/2 rounded border px-2 py-1"
//                   onBlur={(e) =>
//                     dispatch(
//                       setFilter({
//                         min_price: e.target.value
//                           ? Number(e.target.value)
//                           : undefined,
//                       })
//                     )
//                   }
//                 />
//                 <input
//                   type="number"
//                   placeholder="Max"
//                   className="w-1/2 rounded border px-2 py-1"
//                   onBlur={(e) =>
//                     dispatch(
//                       setFilter({
//                         max_price: e.target.value
//                           ? Number(e.target.value)
//                           : undefined,
//                       })
//                     )
//                   }
//                 />
//               </div>
//             </div>

//             <div className="mb-4">
//               <h4 className="text-sm font-semibold mb-2">Rating</h4>
//               <select
//                 className="w-full rounded border px-2 py-1"
//                 value={String(filters.rating ?? "")}
//                 onChange={(e) =>
//                   dispatch(
//                     setFilter({
//                       rating: e.target.value
//                         ? Number(e.target.value)
//                         : undefined,
//                     })
//                   )
//                 }
//               >
//                 <option value="">All</option>
//                 <option value="4">4 & up</option>
//                 <option value="3">3 & up</option>
//                 <option value="2">2 & up</option>
//               </select>
//             </div>

//             <div className="mt-3">
//               <Button
//                 className="bg-black text-white w-full"
//                 onClick={() => {
//                   dispatch(setFilter({}));
//                   dispatch(setPage(1));
//                 }}
//               >
//                 Apply Filters
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </aside>
//   );
// }
