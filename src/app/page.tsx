// src/app/page.tsx

import { fetchJson, buildUrl } from "@/lib/apiClient";
import { ProductsResponse, Category } from "@/lib/types";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import SortSelect from "@/components/SortSelect";
import Footer from "@/components/Footer";
import FiltersWrapper from "@/components/products/FilterWrapper";
import BrowseByCategory from "@/components/BrowseByCategory";
import { Props } from "@/lib/types";

const PRODUCTS_API = "/products/";
const CATEGORIES_API = "/categories/?page_size=20";

export default async function HomePage({ searchParams }: Props) {
  const params = await searchParams;

  const q = params?.search ?? "";
  const page = Number(params?.page ?? 1);
  const page_size = 12;
  const sort = params?.sort ?? "";
  const category = params.category;
  const min_price = params.price__gte;
  const max_price = params.price__lte;
  const average_rating = params.average_rating__gte;

  // Map UI sort → API ordering param
  let ordering: string | undefined = undefined;

  if (sort === "price_asc") ordering = "price";
  else if (sort === "price_desc") ordering = "-price";
  else if (sort === "new") ordering = "-created_at";
  else if (sort === "rating") ordering = "-average_rating";
  else if (sort === "reviews") ordering = "-reviews_count";
  else ordering = undefined;

  const productsUrl = buildUrl(PRODUCTS_API, {
    search: q,
    page,
    page_size,
    ...(ordering ? { ordering } : {}),
    ...(category ? { category } : {}),
    ...(min_price ? { price__gte: min_price } : {}),
    ...(max_price ? { price__lte: max_price } : {}),
    ...(average_rating ? { average_rating__gte: average_rating } : {}),
  });

  const categoriesUrl = buildUrl(CATEGORIES_API);

  const [productsRes, categoriesRes] = await Promise.all([
    fetchJson<ProductsResponse>(productsUrl),
    fetchJson<{ results: Category[] }>(categoriesUrl),
  ]);

  const categories = categoriesRes.results;

  return (
    <main>
      <Header />
      <Hero />
      <section
        id="products-start"
        className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8 scroll-mt-20"
      >
        {/* Sidebar (filters) */}
        <div className="lg:col-span-1 order-1 lg:order-1">
          <FiltersWrapper categories={categories} basePath={"/"} />
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            {/* Sort dropdown */}
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
              {`No results found for "${q}".`}
            </div>
          )}
        </div>
      </section>
      <BrowseByCategory />
      <Footer />
    </main>
  );
}
