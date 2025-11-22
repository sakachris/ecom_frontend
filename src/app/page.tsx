// src/app/page.tsx

import { fetchJson, buildUrl } from "@/lib/apiClient";
import { ProductsResponse, Category } from "@/lib/types";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilterSidebar from "@/components/products/ProductFilterSidebar";
import Pagination from "@/components/ui/Pagination";
import SearchBar from "@/components/SearchBar";
import SortSelect from "@/components/SortSelect";

const PRODUCTS_API = "/products/";
const CATEGORIES_API = "/categories/";

type Props = {
  searchParams: Promise<Record<string, string | undefined>>;
};

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;

  const q = params?.search ?? "";
  const page = Number(params?.page ?? 1);
  const page_size = 12;
  const sort = params?.sort ?? "";

  // Map UI sort → API ordering param
  let ordering: string | undefined = undefined;

  if (sort === "price_asc") ordering = "price";
  else if (sort === "price_desc") ordering = "-price";
  else if (sort === "new") ordering = "-created_at";
  else ordering = undefined;

  // server fetch products & categories
  const productsUrl = buildUrl(PRODUCTS_API, {
    search: q,
    page,
    page_size,
    ...(ordering ? { ordering } : {}),
  });

  const categoriesUrl = buildUrl(CATEGORIES_API);

  const [productsRes, categoriesRes] = await Promise.all([
    fetchJson<ProductsResponse>(productsUrl),
    fetchJson<{ results: Category[] }>(categoriesUrl),
  ]);

  // derive brands from products for filter dropdown
  const brands = Array.from(
    new Set(productsRes.results.map((p) => inferBrandFromName(p.name)))
  );
  const categories = categoriesRes.results;

  return (
    <main>
      <Header />
      <Hero />

      <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <ProductFilterSidebar categories={categories} brands={brands} />
        </div>

        <div className="md:col-span-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div className="w-full sm:w-1/2">
              <SearchBar initial={q} />
            </div>

            {/* Sort Dropdown → now client component */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by</span>
              <SortSelect />
            </div>
          </div>

          {productsRes.results.length > 0 ? (
            <>
              <ProductGrid products={productsRes.results} />

              <Pagination
                page={productsRes.meta.page}
                totalPages={productsRes.meta.pages}
                searchParams={params}
              />
            </>
          ) : (
            <div className="text-center py-10 text-gray-600 text-lg font-medium">
              No results found for "{q}".
            </div>
          )}
        </div>
      </section>

      <footer className="bg-white border-t mt-10">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">ELECTROCO</div>
            <div className="text-sm text-gray-600">
              © {new Date().getFullYear()} ELECTROCO
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function inferBrandFromName(name: string) {
  const known = [
    "HP",
    "Lenovo",
    "Dell",
    "Asus",
    "Samsung",
    "Kingston",
    "IBM",
    "Epson",
    "Microsoft",
  ];
  for (const b of known)
    if (name.toLowerCase().includes(b.toLowerCase())) return b;
  return "Other";
}

// import { fetchJson, buildUrl } from "@/lib/apiClient";
// import { ProductsResponse, Category } from "@/lib/types";
// import Header from "@/components/Header";
// import Hero from "@/components/Hero";
// import ProductGrid from "@/components/products/ProductGrid";
// import ProductFilterSidebar from "@/components/products/ProductFilterSidebar";
// import Pagination from "@/components/ui/Pagination";
// import SearchBar from "@/components/SearchBar";

// const PRODUCTS_API = "/products/";
// const CATEGORIES_API = "/categories/";
// const PRODUCT_IMAGES_API = "/product-images/"; // optional

// type Props = {
//   searchParams: Promise<Record<string, string | undefined>>;
// };

// export default async function HomePage({ searchParams }: Props) {
//   const params = await searchParams;
//   const q = params?.search ?? "";
//   const page = Number(params?.page ?? 1);
//   const page_size = 12;

//   // server fetch products & categories
//   const productsUrl = buildUrl(PRODUCTS_API, {
//     search: q,
//     page,
//     page_size: 12,
//   });
//   const categoriesUrl = buildUrl(CATEGORIES_API);
//   const [productsRes, categoriesRes] = await Promise.all([
//     fetchJson<ProductsResponse>(productsUrl),
//     fetchJson<{ results: Category[] }>(categoriesUrl),
//   ]);

//   // derive brands from products for filter dropdown
//   const brands = Array.from(
//     new Set(productsRes.results.map((p) => inferBrandFromName(p.name)))
//   );
//   const categories = categoriesRes.results;

//   return (
//     <main>
//       <Header />
//       <Hero />

//       <section className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
//         <div className="md:col-span-1">
//           <ProductFilterSidebar categories={categories} brands={brands} />
//         </div>

//         <div className="md:col-span-3">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
//             <div className="w-full sm:w-1/2">
//               <SearchBar initial={q} />
//             </div>

//             <div className="flex items-center gap-3">
//               <span className="text-sm text-gray-600">Sort by</span>
//               <select className="rounded border px-2 py-1">
//                 <option value="popular">Most Popular</option>
//                 <option value="new">Newest</option>
//                 <option value="price_asc">Price: Low → High</option>
//                 <option value="price_desc">Price: High → Low</option>
//                 <option value="rating">Top Rated</option>
//               </select>
//             </div>
//           </div>
//           {productsRes.results.length > 0 ? (
//             <>
//               <ProductGrid products={productsRes.results} />

//               <Pagination
//                 page={productsRes.meta.page}
//                 totalPages={productsRes.meta.pages}
//                 searchParams={params}
//               />
//             </>
//           ) : (
//             <div className="text-center py-10 text-gray-600 text-lg font-medium">
//               No results found for "{q}".
//             </div>
//           )}
//         </div>
//       </section>

//       <footer className="bg-white border-t mt-10">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="flex items-center justify-between">
//             <div className="font-bold text-xl">ELECTROCO</div>
//             <div className="text-sm text-gray-600">
//               © {new Date().getFullYear()} ELECTROCO
//             </div>
//           </div>
//         </div>
//       </footer>
//     </main>
//   );
// }

// function inferBrandFromName(name: string) {
//   // naive brand inference from product name: real app should include a brand field
//   const known = [
//     "HP",
//     "Lenovo",
//     "Dell",
//     "Asus",
//     "Samsung",
//     "Kingston",
//     "IBM",
//     "Epson",
//     "Microsoft",
//   ];
//   for (const b of known)
//     if (name.toLowerCase().includes(b.toLowerCase())) return b;
//   return "Other";
// }
