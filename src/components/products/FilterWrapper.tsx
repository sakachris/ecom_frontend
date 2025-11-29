"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Category } from "@/lib/types";
import ProductFilterSidebar from "./ProductFilterSidebar";

interface FiltersWrapperProps {
  categories: Category[];
}

export default function FiltersWrapper({ categories }: FiltersWrapperProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isInitialRender = useRef(true);

  // Close drawer and scroll after navigation completes
  useEffect(() => {
    if (loading && !isInitialRender.current) {
      const el = document.getElementById("products-start");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      // Use a microtask to avoid calling setState directly in effect body
      queueMicrotask(() => {
        setLoading(false);
        setOpen(false);
      });
    }
    isInitialRender.current = false;
  }, [pathname, loading]);

  const handleApply = (filters: {
    category: string;
    minPrice: string;
    maxPrice: string;
    minRating: string;
  }) => {
    setLoading(true);

    const params = new URLSearchParams();
    if (filters.category) params.set("category", filters.category);
    if (filters.minPrice) params.set("price__gte", filters.minPrice);
    if (filters.maxPrice) params.set("price__lte", filters.maxPrice);
    if (filters.minRating) params.set("average_rating__gte", filters.minRating);

    // Reset pagination
    params.set("page", "1");

    router.push(`/?${params.toString()}`);
  };

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4 flex justify-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900 transition"
        >
          {loading ? "Applying..." : "Filters"}
        </button>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <ProductFilterSidebar categories={categories} onApply={handleApply} />
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
          <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 p-4 transform animate-slideIn">
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
              onApply={handleApply}
            />
          </div>
        </div>
      )}
    </>
  );
}

// // src/components/products/FilterWrapper.tsx
// // FilterWrapper.tsx
// "use client";

// import { useState, useEffect } from "react";
// import { usePathname } from "next/navigation";
// import type { Category } from "@/lib/types";
// import ProductFilterSidebar from "@/components/products/ProductFilterSidebar";

// export default function FiltersWrapper({
//   categories,
// }: {
//   categories: Category[];
// }) {
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const pathname = usePathname();

//   // detect route change to auto-scroll and close drawer
//   useEffect(() => {
//     if (loading) {
//       const el = document.getElementById("products-start");
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth" });
//       }
//       setLoading(false);
//       setOpen(false);
//     }
//   }, [pathname, loading]);

//   return (
//     <>
//       {/* Mobile filter button */}
//       <div className="lg:hidden mb-4 flex justify-end">
//         <button
//           type="button"
//           onClick={() => setOpen(true)}
//           className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900 transition"
//         >
//           Filters
//         </button>
//       </div>

//       {/* Desktop sidebar */}
//       <div className="hidden lg:block">
//         <ProductFilterSidebar
//           categories={categories}
//           onLoadingChange={setLoading}
//         />
//       </div>

//       {/* Mobile drawer */}
//       {open && (
//         <div>
//           <div
//             role="button"
//             tabIndex={0}
//             aria-label="Close filters"
//             onClick={() => setOpen(false)}
//             onKeyDown={() => setOpen(false)}
//             className="fixed inset-0 bg-black/40 z-40"
//           />
//           <div className="fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 p-4 transform animate-slideIn">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Filters</h3>
//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="text-gray-600 hover:text-black transition text-sm"
//               >
//                 Close ✕
//               </button>
//             </div>
//             <ProductFilterSidebar
//               categories={categories}
//               onLoadingChange={setLoading}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// "use client";
// import { useState } from "react";
// import type { Category } from "@/lib/types";
// import ProductFilterSidebar from "@/components/products/ProductFilterSidebar";

// export default function FiltersWrapper({
//   categories,
// }: {
//   categories: Category[];
// }) {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       {/* Mobile filter button */}
//       <div className="lg:hidden mb-4 flex justify-end">
//         <button
//           type="button"
//           onClick={() => setOpen(true)}
//           className="px-4 py-2 bg-black text-white rounded-full text-sm hover:bg-gray-900 transition"
//         >
//           Filters
//         </button>
//       </div>

//       {/* Desktop sidebar */}
//       <div className="hidden lg:block">
//         <ProductFilterSidebar categories={categories} />
//       </div>

//       {/* Mobile drawer */}
//       {open && (
//         <div>
//           {/* Overlay */}
//           <div
//             role="button"
//             tabIndex={0}
//             aria-label="Close filters"
//             onClick={() => setOpen(false)}
//             onKeyDown={() => setOpen(false)}
//             className="fixed inset-0 bg-black/40 z-40"
//           />

//           {/* Drawer panel */}
//           <div
//             className="
//               fixed
//               top-0
//               left-0
//               h-full
//               w-72
//               bg-white
//               shadow-lg
//               z-50
//               p-4
//               transform
//               animate-slideIn
//             "
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Filters</h3>

//               <button
//                 type="button"
//                 onClick={() => setOpen(false)}
//                 className="text-gray-600 hover:text-black transition text-sm"
//               >
//                 Close ✕
//               </button>
//             </div>
//             <ProductFilterSidebar
//               categories={categories}
//               onApplied={() => setOpen(false)}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
