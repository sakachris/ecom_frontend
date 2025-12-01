// src/app/categories/[id]/page.tsx

import { fetchJson, buildUrl } from "@/lib/apiClient";
import { ProductsResponse, Category } from "@/lib/types";
import Header from "@/components/Header";
import ProductGrid from "@/components/products/ProductGrid";
import Pagination from "@/components/ui/Pagination";
import SortSelect from "@/components/SortSelect";
import Footer from "@/components/Footer";
import FiltersWrapper from "@/components/products/FilterWrapper";
import { Props } from "@/lib/types";

const PRODUCTS_API = "/products/";
const CATEGORIES_API = "/categories/?page_size=20";

export default async function CategoryPage(props: Props) {
  const { id } = await props.params; //category ID from URL
  const params = await props.searchParams;

  const q = params?.search ?? "";
  const page = Number(params?.page ?? 1);
  const page_size = 12;
  const sort = params?.sort ?? "";

  // Filters
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

  // Fetch products filtered by category ID
  const productsUrl = buildUrl(PRODUCTS_API, {
    page,
    page_size,
    ...(q ? { search: q } : {}),
    ...(ordering ? { ordering } : {}),
    category: id, // <-- always use ID from route
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
  const category = categories.find((cat) => cat.category_id === id) || {
    category_id: id,
    name: "Category",
  };
  return (
    <main>
      <Header />
      <section
        id="products-start"
        className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8"
      >
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 order-1 lg:order-1 sm:mt-4 mt-0">
          <FiltersWrapper
            categories={categories}
            basePath={`/categories/${id}`}
          />
        </div>

        {/* Main content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          <div className="flex flex-col items-center justify-center md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-2xl font-bold mb-0">{category.name}</h1>
              {category.description && (
                <p className="text-gray-600 mt-1">{category.description}</p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by</span>
              <SortSelect basePath={`/categories/${id}`} />
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
              {q
                ? `No results found for "${q}".`
                : "No products found in this category."}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
